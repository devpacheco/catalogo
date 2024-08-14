import { useState, useEffect, useContext } from "react"
import { Container } from "../../Components/Container"
import { PanelHeader } from "../../Components/PanelHeader"
import { AuthContext } from "../../Contexts/AuthContext"
import { FaRegTrashAlt } from "react-icons/fa";

import { storage } from "../../Services/firebaseConnection"
import { ref, deleteObject } from "firebase/storage"

import { db } from "../../Services/firebaseConnection"
import { doc, deleteDoc, getDocs, query, orderBy, collection } from "firebase/firestore"

interface ImageProps {
    uid: string;
    name: string;
    url: string;
}

interface ProductProps {
    id: string;
    name: string;
    price: string;
    parcela: string;
    tamanho: string;
    created: string;
    images: ImageProps[];
}

export function Dashboard(){
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState<ProductProps[]>([])

    useEffect(()=>{
        function loadProducts(){
            if(!user?.uid){
                return;
            }

            const productRef = collection(db, "product")
            const queryRef = query(productRef, orderBy("created", "desc"))

            getDocs(queryRef)
            .then((snapshot)=>{
                let listProduct = [] as ProductProps[];

                snapshot.forEach((doc)=>{
                    listProduct.push({
                        id: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        parcela: doc.data().parcela,
                        tamanho: doc.data().tamanho,
                        created: doc.data().created,
                        images: doc.data().images
                    })
                })
                setProduct(listProduct);
            })

        }

        loadProducts();

    },[])

    async function handleDeleteProduct(item: ProductProps){
        const productItem = item;
        const productPath = doc(db, "product", productItem.id)

        await deleteDoc(productPath)

        item.images.map(async(image)=>{
            const imagePath = `images/${image.uid}/${image.name}`
            const imageRef = ref(storage, imagePath)

            try{
                await deleteObject(imageRef)
            }catch(err){
                console.log("ERROR AO AO TENTAR EXCLUIR IMAGEM")
            }
        })
        setProduct(product.filter(doc=> doc.id !== productItem.id))
    }


    return(
        <Container>
            <PanelHeader/>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-3">
                {product.map((item)=>(
                    <section className="w-full bg-bege rounded-md p-4 shadow-lg hover:shadow-2xl duration-500 relative">

                            <button 
                            onClick={()=> handleDeleteProduct(item)}
                            className="absolute bg-white rounded-full w-12 h-12 flex justify-center items-center right-6 top-6"
                            >
                                <FaRegTrashAlt size={22} color="#5b2614" />
                            </button>

                            <img 
                            className="max-h-72 rounded-md w-full object-cover mb-4 "
                            src={item.images[0].url} 
                            alt="Foto do Tenis" 
                            />

                            <h1 className="text-marrom font-extrabold text-xl mb-4"> {item.name} </h1>

                        <p className="text-sm">A partir de</p>

                        <h1 className="text-marrom font-extrabold text-xl"> R$ {item.price} </h1>

                        <p> {item.parcela} </p>
                    </section>
                ))}
            </main>
        </Container>
    )
}