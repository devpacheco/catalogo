import { useContext } from "react";
import LogoImg from "../../assets/Logo m7b.png"
import { Link } from "react-router-dom"
import { IoLogOut } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

import { AuthContext } from "../../Contexts/AuthContext";


export function Header(){
    const { user } = useContext(AuthContext)

    return(
        <header className="w-full h-16 bg-bege shadow-md">
            <nav className="max-w-7xl flex justify-between items-center mx-auto px-1">
                <div>
                    <Link to="/">
                        <img 
                        className="max-w-44"
                        src={LogoImg} 
                        alt="Logo da Aplicação" 
                        />
                    </Link>
                </div>

                {!user && (
                    <div>
                        <Link to="/login">
                            <IoLogOut size={36} color="#5b2614"/>
                        </Link>
                    </div>
                )}

                {user && (
                    <Link to="/dashboard">
                        <FaCircleUser size={36} color="#5b2614"/>
                    </Link>
                )}


            </nav>
        </header>
    )
}