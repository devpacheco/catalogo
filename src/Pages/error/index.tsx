import { Container } from "../../Components/Container";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export function Notfound(){
    return(
        <Container>
            <main className="h-screen w-full flex flex-col justify-center items-center">
                <h1 className="text-center font-bold text-4xl">Error 404</h1>
                <h2 className="text-center font-bold text-2xl mb-3">Página não existe!</h2>
                <Link to="/" 
                className="text-white bg-marrom p-3 rounded-md hover:scale-105 duration-500 flex justify-center items-center w-72 gap-2"
                >
                <span>Voltar Pra Página de Produtos</span> <FaHome/>
                </Link>
            </main>
        </Container>
    )
}