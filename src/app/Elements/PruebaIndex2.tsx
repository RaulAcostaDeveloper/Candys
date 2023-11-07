import { useState } from "react";
import { MiComponente } from "./MiComponente"

export const PruebaIndex2 = (): JSX.Element => {
    const [ miValor, setMiValor ] = useState('');
    const imprimeMiValor = () => {
        console.log(miValor);
    }
    return (
        <div>
            <input type="text" onChange={(e)=> setMiValor(e.target.value)} />
            <p>input value {miValor}</p>
            <MiComponente funcion={ () => imprimeMiValor() }/>
        </div>
    )
}