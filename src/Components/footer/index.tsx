import { FaInstagram, FaPhone } from "react-icons/fa";
import { FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPix } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { IoLinkSharp } from "react-icons/io5";


export function Footer(){
    return(
        <footer className="w-full h-76 bg-bege mt-10 flex flex-col items-center">
            <div className="w-full max-w-5xl flex flex-col p-5 md:flex-row">

                {/* CONTATOS */}

                <div className="flex flex-col justify-center w-full mb-5 md:mb-0" >
                    <h1 className="font-bold text-xl mb-1">Contatos</h1>
                    <nav className="flex items-center gap-1">
                        <FaPhone />
                        <p> +55 (81) 98980-1354 </p>
                    </nav>
                    <nav className="flex items-center gap-1">
                        <MdEmail />
                        <p> m7bshoes@gmail.com </p>
                    </nav>
                    <nav className="flex items-center gap-1">
                        <FaLocationDot />
                        <p> Carpina - PE </p>
                    </nav>
                </div> 

                {/* FORMAS DE PAGAMENTO */}

                <div className="flex flex-col justify-center w-full mb-5 md:mb-0">
                    <h1 className="font-bold text-xl mb-1"> Formas de Pagamentos </h1>
                    <nav className="flex items-center gap-1" >
                        <FaPix/>
                        <span className="font-medium" >pix</span>
                    </nav>
                    <nav className="flex items-center gap-1" >
                        <IoIosCard/>
                        <span className="font-medium" >Cartão até 5x sem juros</span>
                    </nav>
                    <nav className="flex items-center gap-1" >
                        <LiaMoneyBillWaveSolid/>
                        <span className="font-medium" >Em Espécie</span>
                    </nav>
                </div>

                {/* REDE SOCIAIS */}

                <div className="flex flex-col justify-center mb-11 w-full">
                    <h1 className="font-bold text-xl mb-1"> Redes Sociais </h1>
                    <div className="flex gap-2" >
                        <nav className="flex items-center gap-1" >
                            <a href="https://www.instagram.com/m7b_shoes/" target="_blank">
                                <FaInstagram size={30} />
                            </a>
                        </nav>
                        <nav className="flex items-center gap-1" >
                            <a href="https://wa.me/?text= Olá queria Suporte!" target="_blank">
                                <FaWhatsapp size={30} />
                            </a>
                        </nav>
                        <nav className="flex items-center gap-1" >
                            <a href="https://catalogo-rho.vercel.app" target="_blank">
                                <IoLinkSharp size={30} />
                            </a>
                        </nav>
                    </div>
                </div>

            </div>{/* FIM DO RODAPÉ */}
            <section className="w-full bg-marrom h-10 flex justify-center items-center">
                <h2 className="text-bege font-medium text-xs md:text-sm"> Todos os direitos reservados <span className="font-bold">@M7Bshoes</span> </h2>
            </section>
        </footer>
    )
}