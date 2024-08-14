import { useContext, useState } from "react";
import { Container } from "../../../Components/Container"; 
import { PanelHeader } from "../../../Components/PanelHeader"; 
import { BiImageAdd } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { AuthContext } from "../../../Contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';

import { Input } from "../../../Components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { storage } from "../../../Services/firebaseConnection";
import { 
    uploadBytes,
    deleteObject,
    ref,
    getDownloadURL
 } from "firebase/storage";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

import { db } from "../../../Services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
    name: z.string().nonempty("O campo nome é Obgrigatório"),
    price: z.string().nonempty("O Campo preço é Obrigátorio"),
    parcela: z.string().nonempty("O campo parcela é Obrigatório"),
    tamanho: z.string().nonempty("O Campo tamanho é Obrigátorio"),
    cor: z.string().nonempty("O Campo cor é Obrigátorio")
})

type FormData = z.infer<typeof schema>

interface ImageItemProps{
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

export function New(){
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange" 
    })

    const [productImage, setProductImage] = useState<ImageItemProps[]>([]);


    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]
            
            if(image.type === "image/jpeg" || image.type === "image/png"){
                handleUpload(image)
                console.log("Imagem Cadastrada com sucesso")
            } else {
                console.log("ERROR AO CADASTRAR IMAGEM")
            }
        }
    }

    function handleUpload(image: File){
        if(!user?.uid){
            return;
        }

        const currentUid = user.uid;
        const UidImage = uuidv4();

        const uploadRef = ref(storage, `images/${currentUid}/${UidImage}`);

        uploadBytes(uploadRef, image)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((downloadUrl)=>{
                const imageItem = {
                    uid: currentUid,
                    name: UidImage,
                    previewUrl: URL.createObjectURL(image),
                    url: downloadUrl
                }
                setProductImage((image)=> [...image, imageItem]);
            })
        })
    }

    async function handleDeleteImage(item: ImageItemProps){
        const imagePath = `images/${item.uid}/${item.name}`

        const imageRef = ref(storage, imagePath)

        try{
            await deleteObject(imageRef)
            setProductImage(productImage.filter((product)=> product.url !== item.url))
        }catch(err){
            console.log("ERROR AO DELETAR IMAGEM")
            console.log(err)
        }

    }

    function onSubmit(data: FormData){
        if(productImage.length === 0){
            toast("Adicione Uma Imagem", {
                icon: "🖼️"
            })
        }

        const ListImage = productImage.map((item)=>{
            return{
                name: item.name,
                uid: item.uid,
                url: item.url,
                previewUrl: item.previewUrl,
            }
        })

        addDoc(collection(db, "product"),{
            name: data.name.toUpperCase(),
            price: data.price,
            parcela: data.parcela,
            tamanho: data.tamanho,
            cor: data.cor,
            created: new Date(),
            images: ListImage,
        })
        .then(()=>{
            reset()
            setProductImage([]);
            toast("Tênis Cadastrado com sucesso",{
                icon: "👟"
            })
        })
        .catch((error)=>{
            console.log("ERROR AO CADASTRAR ITEM", error)
        })

    }


    return(
        <Container>
            <PanelHeader/>

            <main>
                <div className="w-full h-52 bg-bege rounded-md px-2 py-2 mb-5 flex gap-3">

                    <button className="w-48 h-48 border-2 border-marrom rounded-md flex justify-center items-center">
                        <div className="absolute">
                            <BiImageAdd size={38} color="#5b2614" />
                        </div>

                        <div className="cursor-pointer">
                            <input
                            className="opacity-0 cursor-pointer"
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            />
                        </div>
                    </button>

                    {productImage.map((item)=>(
                        <div className="w-full flex justify-center items-center">
                        <button className="absolute" onClick={()=> handleDeleteImage(item)}>
                            <FiTrash size={32} color="#FFF" />
                        </button>
                        <img 
                        className="w-full h-48 rounded-md object-cover"
                        src={item.previewUrl} 
                        alt={item.name} 
                        />
                        </div>
                    ))}

                </div>

                <form 
                className="w-full bg-bege rounded-md px-2 py-2 mb-5"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full mb-3">
                        <p className="font-bold mb-1">Nome do Produto:</p>
                        <Input
                        type="text"
                        placeholder="Digite o nome do produto..."
                        name="name"
                        register={ register }
                        error={ errors.name?.message }
                        />
                    </div>

                    <div className="w-full flex justify-center items-center gap-3">
                        <div className="w-full mb-3">
                            <p className="font-bold mb-1">Preço:</p>
                            <Input
                            type="text"
                            placeholder="Ex: R$ 299,99..."
                            name="price"
                            register={ register }
                            error={ errors.price?.message }
                            />
                        </div>

                        <div className="w-full mb-3">
                            <p className="font-bold mb-1">Parcelas:</p>
                            <Input
                            type="text"
                            placeholder="Ex: Ou 4x de 57,90"
                            name="parcela"
                            register={ register }
                            error={ errors.parcela?.message }
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center gap-3">
                        <div className="w-full mb-3">
                            <p className="font-bold mb-1">Tamanho Disponìveis:</p>
                            <Input
                            type="text"
                            placeholder="Ex: 37 38 39 40 41 42"
                            name="tamanho"
                            register={ register }
                            error={ errors.tamanho?.message }
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center gap-3">
                        <div className="w-full mb-3">
                            <p className="font-bold mb-1">Cor do Produto:</p>
                            <Input
                            type="text"
                            placeholder="Ex: vermelho..."
                            name="cor"
                            register={ register }
                            error={ errors.cor?.message }
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full rounded-md h-11 bg-marrom text-white font-medium" > Cadastrar </button>

                </form>
            </main>
        </Container>
    )
}