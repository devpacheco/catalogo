import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../Services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    signed: boolean;
    loadingAuth: boolean;
    user: UserProps | null;
}

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps | null>(null)
    const [loadingAuth, setLoadinAuth] = useState(true);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                setLoadinAuth(false);
            } else {
                setUser(null)
                setLoadinAuth(false)
            }
        })

        return ()=> {
            unsub();
        }

    },[])

    return(
        <AuthContext.Provider value={{
            signed: !!user,
            loadingAuth,
            user
        }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;