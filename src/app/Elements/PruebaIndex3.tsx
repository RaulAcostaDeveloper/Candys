import { useEffect, useState } from "react";
import { CandyContainer } from "./Candys/CandyContainer"
import { printCandyMatrix, setPosicionActualCandyMatrix } from "./Candys/CandyCrud"
import { MiModal1 } from "./MiModal1";
type staticStates = {
    dataInput: string;
    arrElementos: string[];
}
const staticStates: staticStates = {
    dataInput: '',
    arrElementos: [],
}
export const PruebaIndex3 = (): JSX.Element => {
    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ arregloElementos, setArregloElementos ] = useState<Array<string>>([]);
    printCandyMatrix();
    // Primer render
    useEffect(()=>{
       setPosicionActualCandyMatrix([1,1]);
    },[]);
    // Escucha de cambio del state
    useEffect(()=>{
        staticStates.dataInput = value;
        staticStates.arrElementos = arregloElementos;
    },[value, arregloElementos]);
    
    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }
    useEffect(()=>{
        if (isOpenModal) {
            setPosicionActualCandyMatrix([2,1]);
        } else {
            setPosicionActualCandyMatrix([1,1]);
        }
    },[isOpenModal]);
    const handleAniadir = () => {
        const arr = staticStates.arrElementos.map(el=>el);
        arr.push(staticStates.dataInput);
        setArregloElementos(arr);
    }
    return (
        <div>
            <CandyContainer posicion={[1,1]} className="candyButton-1" onEnter={()=> handleOpenModal()}>
                <button onClick={()=>handleOpenModal()}>Añadir</button>
            </CandyContainer>
            { isOpenModal && 
                <MiModal1 title="Añadir" close={ () => handleCloseModal() } posisionCandyClose={[4,1]}>
                    <CandyContainer posicion={[2,1]} idInput="input-aniadir-primero" className="candyInput-1">
                        <input type="text" id="input-aniadir-primero" onChange={(e)=> setValue(e.target.value) }/>
                    </CandyContainer>
                    <CandyContainer className="candyButton-1" posicion={[3,1]} onEnter={() => handleAniadir()}>
                        <button onClick={()=> handleAniadir()}>Añadir</button>
                    </CandyContainer>
                </MiModal1>
            }
            { arregloElementos && 
                arregloElementos.map((el, index) => {
                    return (
                        <div>{index} _ {el}</div>
                    )
                })
            }
        </div>
    )
}