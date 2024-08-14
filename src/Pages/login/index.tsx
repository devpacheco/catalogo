import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../Components/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import ImgLogo from '../../assets/Logo m7b.png'
import { Link } from 'react-router-dom'

import { auth } from '../../Services/firebaseConnection'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const schema = z.object({
    email: z.string().email("Email Incorreto").nonempty("O Campo Email é Obrigatório"),
    password: z.string().nonempty("O Campo Senha é Obrigátorio")
})

type FormData = z.infer<typeof schema>;

export function Login(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    useEffect(()=>{
        async function handleLogout(){
            await signOut(auth)
        }

        handleLogout();

    },[])

    function onSubmit(data: FormData){
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(()=>{
            console.log("USUÁRIO LOGADO COM SUCESSO")
            navigate("/dashboard")
        })
        .catch((error)=>{
            console.log("ERROR AO CADASTRAR USUÁRIO", error)
        })
    }

    return(
        <div className='flex flex-col items-center justify-center h-screen w-full'>
            <img 
            className='max-w-sm lg:max-w-xl'
            src={ImgLogo} 
            alt="Logo da Aplicação"
            />

            <div className='p-1 max-w-xl w-full lg:max-w-4xl mb-2'>
            <form 
            className='max-w-xl w-full rounded-md bg-bege p-4 flex flex-col gap-3 lg:max-w-4xl'
            onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                placeholder='Digite o seu email...'
                type='email'
                name='email'
                register={ register }
                error={ errors.email?.message }
                />

                <Input
                placeholder='Digite sua senha...'
                type='password'
                name='password'
                register={ register }
                error={ errors.password?.message }
                />

                <button type='submit' className='h-11 rounded-md bg-marrom text-white font-medium w-full'>
                    Acessar
                </button>
                
            </form>
            </div>

            <p className='text-marrom text-sm lg:text-lg'>Caso você não seja Admin <Link className='font-medium' to="/"> Voltar para as Compras </Link> </p>

        </div>
    )
}