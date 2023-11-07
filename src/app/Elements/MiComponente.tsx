import { useEffect } from "react";

type Props = {

    funcion: (...args: any[]) => void;
}
export const MiComponente = ({ funcion }: Props): JSX.Element => {
    useEffect(()=>{
        document.addEventListener('keyup', handleKeyUp);
    },[]);
    const handleKeyUp = (event: any): void => {
        let key: string = event.code || String.fromCharCode(event.keyCode || event.which);
        switch (key.toLowerCase()) {
            case 'enter':
            // Esto si funciona
            //   <button onClick={ () => funcion() }>button</button>

            // Pero esto no
            funcion();
            // Ni esto
            ( () => funcion() )();
            break;
        default:
            break;
        }
    }
    const ejecucionDelEnter = () => {
        console.log('ejecución del enter');
        
        
    }
    return (
        <div>
            <button onClick={ () => funcion() }>button</button>
        </div>
    )
}