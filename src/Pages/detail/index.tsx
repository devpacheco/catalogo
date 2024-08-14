import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../../Components/Container"
import { AiFillInstagram } from "react-icons/ai";

import { db } from "../../Services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore"; 

interface ImageProps {
    uid: string;
    name: string;
    url: string;
    previewUrl: string;
}

interface ProductProps {
    id: string;
    name: string;
    price: string;
    parcela: string;
    tamanho: string;
    cor: string;
    created: string;
    images: ImageProps[];
}


export function Detail(){
    const [product, setProduct] = useState<ProductProps>()
    const { id } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState("");

    useEffect(()=>{
        function loadProduct(){
            if(!id){ return; }

            const docRef = doc(db, "product", id)
            getDoc(docRef)
            .then((snapshot)=>{
                if(!snapshot.data()){
                    navigate("/")
                }

                setProduct({
                    id: snapshot.id,
                    name: snapshot.data()?.name,
                    price: snapshot.data()?.price,
                    parcela: snapshot.data()?.parcela,
                    tamanho: snapshot.data()?.tamanho,
                    cor: snapshot.data()?.cor,
                    created: snapshot.data()?.created,
                    images: snapshot.data()?.images
                })
            })
        }

        loadProduct();

    },[id])

    function handlePedido(){
        const number = "+5581989768611"
                
        var url = `https://wa.me/${number}?text=Nome: ${product?.name}%0aPreço: ${product?.price}%0aTamanho: ${input}%0aCor: ${product?.cor}`;

        window.open(url, "_blank")?.focus();
    }


    return(
        <Container>
            <main className="w-full">
            <section className="w-full flex-col gap-6">
                <div className="h-96  relative bg-bege rounded-md mb-3">

                    <a 
                    className="absolute bg-marrom text-white w-12 h-12 rounded-full flex justify-center items-center top-6 left-6"
                    href="https://www.instagram.com/m7b_shoes/"
                    target="_blank"
                    >
                    <AiFillInstagram size={28}/>
                    </a>

                    <img
                    className="rounded-md h-96 w-full object-cover"
                    src={product?.images[0].url} 
                    alt="Foto do Tênis" 
                    />
                </div>

                <div className="flex-1 bg-bege rounded-md p-2 mb-4">
                    <h1 className="font-extrabold text-marrom uppercase text-2xl mb-4 lg:text-4xl"> {product?.name} </h1>

                    <div className="flex-col w-60 mb-3">
                        <span className="text-marrom">por Apenas</span>
                        <h1 className="font-bold text-2xl lg:text-3xl text-marrom"> R$ {product?.price} </h1>
                        <span className="text-marrom"> {product?.parcela} </span>
                    </div>

                    <div className="flex-col w-72 mb-3">
                        <span className="text-marrom font-bold">Tamanhos Disponíveis:</span>
                        <div className="border-2 border-marrom rounded-md p-2 mt-2 flex justify-center mb-3">
                            <span className="font-medium"> {product?.tamanho} </span>
                        </div>
                    </div>

                    <div className="flex-col w-60 mb-3">
                        <div className="mb-2">
                        <span className="text-marrom font-bold">Informe o seu Tamanho:</span>
                        </div>
                        <input 
                        className="h-11  rounded-md border-2 outline-none border-marrom bg-bege w-64 mb-3 px-2 placeholder-marrom"
                        type="text" 
                        placeholder="digite o tamanho..."
                        value={input}
                        onChange={(e)=> setInput(e.target.value)}
                        />
                    </div>


                    <button onClick={()=> handlePedido()} className="w-full h-11 bg-marrom text-white font-medium rounded-md"> Fazer Pedido </button>

                </div>
            </section>
            </main>
        </Container>
    )
}