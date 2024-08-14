import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    name: string;
    type: string;
    placeholder: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({name, type, placeholder, register, error, rules}: InputProps){
    return(
        <div>
            <input
            className="w-full px-3 rounded-md h-11 outline-none border-2 border-marrom"
            placeholder={ placeholder }
            type={ type }
            {...register(name, rules)}
            id={ name }
            />
            {error && <p> {error} </p>}
        </div>
    )
}