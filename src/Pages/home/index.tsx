import { useState, useEffect } from "react";
import { Container } from "../../Components/Container"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import BannerOne from "../../assets/banner (1).png"
import BannerTwo from "../../assets/banner (2) .png"

import { db } from "../../Services/firebaseConnection";
import { 
    getDocs,
    collection,
    query,
    where,
    orderBy,
 } from "firebase/firestore";


interface ProductProps {
    id: string;
    name: string;
    price: string;
    tamanho: string;
    parcela: string;
    images: ImageItemProps;
    created: string;
 }

 interface ImageItemProps {
    name: string;
    uid: string;
    url: string;
 }

export function Home(){
    const [productData, setProductData] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState("");
    const [preview, setPreview] = useState<number>(2)

    useEffect(()=>{

        loadProduct();

    },[])

    function loadProduct(){
        const ProductPath = collection(db, "product")
        const queryRef = query(ProductPath, orderBy("created", "desc"))

        getDocs(queryRef)
        .then((snapshot)=>{
            let listProduct = [] as ProductProps[];

            snapshot.forEach((doc)=>{
                listProduct.push({
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                    tamanho: doc.data().tamanho,
                    parcela: doc.data().parcela,
                    created: doc.data().created,
                    images: doc.data().images
                })
            })
            setProductData(listProduct)
        })
    }

    async function handleSearch(){
        if(search === ""){
            loadProduct();
            return;
        }

        setProductData([]);

        const q = query(collection(db, "product"),
        where("name", ">=", search.toUpperCase()),
        where("name", "<=", search.toUpperCase() + "\uf8ff")
        )

        const querySnapshot = await getDocs(q)

        let listProduct = [] as ProductProps[];

        querySnapshot.forEach((doc)=>{
            listProduct.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                tamanho: doc.data().tamanho,
                parcela: doc.data().parcela,
                created: doc.data().created,
                images: doc.data().images
            })
        })
        setProductData(listProduct);
    }

    useEffect(()=>{
        function handleResize(){
            if(window.innerWidth < 720){
                setPreview(1)
            } else {
                setPreview(2)
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize)

        return()=>{
            window.removeEventListener("resize", handleResize)
        }

    },[])
    return(
        <Container>
            <section className="max-w-5xl bg-bege w-full rounded-md mx-auto p-4 flex items-center gap-3 mb-5">
                <input
                className="w-full rounded-md h-11 outline-none px-3"
                placeholder="Informe o Nome do Produto..."
                type="text"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                />
                <button 
                type="submit" 
                className="bg-marrom text-white h-11 rounded-md px-5 font-medium"
                onClick={handleSearch}
                >
                Buscar
                </button>
            </section>

            <Swiper
            slidesPerView={ preview }
            pagination={{ clickable: true }}
            navigation
            >
                <SwiperSlide>
                    <img 
                    src={BannerOne} 
                    alt="Banner 1" 
                    className="mb-5 rounded-l-lg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    src={BannerTwo} 
                    alt="Banner 2" 
                    className="mb-5 rounded-r-lg"
                    />
                </SwiperSlide>
            </Swiper>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                {productData.map((item)=>(
                <section key={item.id} className="w-full bg-bege rounded-md p-4 shadow-lg hover:shadow-2xl duration-500">
                    <Link to={`/detail/${item.id}`}>
                        <img 
                        className="max-h-72 rounded-md w-full object-cover mb-4 "
                        src={item.images[0].url} 
                        alt="Foto do Tenis" 
                        />

                        <h1 className="text-marrom font-extrabold text-xl mb-4"> {item.name} </h1>
                    </Link>

                    <p className="text-sm">A partir de</p>

                    <h1 className="text-marrom font-extrabold text-xl"> R$ {item.price} </h1>

                    <p> {item.parcela} </p>
                </section>
                ))}
            </main>
        </Container>
    )
}