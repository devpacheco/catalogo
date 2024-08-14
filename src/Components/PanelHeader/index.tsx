import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";

export function PanelHeader(){
    return(
        <div className="w-full h-9 rounded-md bg-bege flex justify-between items-center px-4 py-4 font-medium gap-6 mb-5">
            <div className="flex gap-6">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/new">Cadastrar Produto</Link>
            </div>

            <div>
                <Link to="/">
                <FaHome size={22} color="#5b2614"/>
                </Link>
            </div>
        </div>
    )
}