import { ReactNode } from "react";

export function Container({children}: {children: ReactNode}){
    return(
        <div className="max-w-7xl mx-auto px-1 mt-10">
            {children}
        </div>
    )
}