'use client'

import { useEffect, useState } from "react";
import { CandyContainer } from "./Candys/CandyContainer";
import { setPosicionActualCandyMatrix } from "./Candys/CandyCrud";
import { MiModal1 } from "./MiModal1";

export const Index = (): JSX.Element => {
    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ isOpenSecondModal, setIsOpenSecondModal ] = useState(false);
    const [ valueInput1, setValueInput1 ] = useState('primer state input 1');
    const [ valueInput2, setValueInput2 ] = useState('primer state input 2');

    useEffect(()=>{
        // Siempre hay uno al inicio de la aplicación
        setPosicionActualCandyMatrix([4,1]);
    },[]);

    // Así con todos los modales
    useEffect(()=>{
        if (isOpenModal) {
            // A donde se va a ir al abrir el modal
            setPosicionActualCandyMatrix([6,1]);
        } else {
            // A donde se va a ir después de cerrar este modal
            setPosicionActualCandyMatrix([4,1]);
        }
    },[isOpenModal]);

    useEffect(()=>{
        if (isOpenSecondModal) {
            // A donde se va a ir al abrir el modal
            setPosicionActualCandyMatrix([11,1]);
        } else {
            // A donde se va a ir después de cerrar este modal
            if (isOpenModal) {
                setPosicionActualCandyMatrix([6,1]);
            }
        }
    },[isOpenSecondModal]);

    // Los métodos que recibe el candy en el primer render mantienen los valores iniciales del state
    // Porque no están anclados al state si no al array...
    // Deben estar anclados al state del componente y ejecutarse en el componente, no en el array
    // Tengo que hacer que la ejecución de onEnter y onSpace sea dentro del Componente candy
    const handleAceptarModal = () => {
        console.log('valueInput1 ', valueInput1);
        console.log('valueInput2 ', valueInput2);
        setIsOpenSecondModal(true);
    }
    
    return (
        <div>
            <div className="filaFlex">

                <CandyContainer
                    posicion={[1,1]}
                    className="candyButton-1">
                    <button>1,1</button>
                </CandyContainer>

                <CandyContainer
                    posicion={[1,2]}
                    className="candyButton-1">
                    <button>1,2</button>
                </CandyContainer>

                <CandyContainer
                    posicion={[1,3]}
                    className="candyButton-1">
                    <button>1,3</button>
                </CandyContainer>

            </div>
            <div className="filaFlex">

                <CandyContainer
                    posicion={[2,1]}
                    className="candyButton-1">
                    <button>2,1</button>
                </CandyContainer>

            </div>
            <div className="filaFlex">

                <CandyContainer
                    posicion={[3,1]}
                    className="candyButton-1 floatLeft">
                    <button>3,1</button>
                </CandyContainer>

                <CandyContainer
                    posicion={[3,2]}
                    className="candyButton-1 floatLeft">
                    <button>3,2</button>
                </CandyContainer>

                <CandyContainer
                    posicion={[3,3]}
                    className="candyButton-1">
                    <button>3,3</button>
                </CandyContainer>

            </div>
            <div className="filaFlex">
                <CandyContainer
                    posicion={[4,1]}
                    className="candyInput-1"
                    idInput="input-form1-name1">
                    <input id="input-form1-name1" type="text" placeholder="4,1"/>
                </CandyContainer>
            </div>
            <div className="filaFlex">
                <CandyContainer
                    posicion={[5,1]}
                    className="candyButton-2"
                    onEnter={  () => setIsOpenModal(true) }>
                    <button onClick={ () => setIsOpenModal(true) }>Open modal</button>
                </CandyContainer>
            </div>
            <div>
                <h3>Valores del state</h3>
                <p>Inputs en el modal</p>
                <p>input 1 = <b>{ valueInput1 }</b></p>
                <p>input 2 = <b>{ valueInput2 }</b></p>
            </div>
            { isOpenModal && 
                <MiModal1
                    title="Form"
                    close={ () => setIsOpenModal(false) }
                    posisionCandyClose = {[10,1]}>
                        <div className="bodyForm">
                            <CandyContainer
                                posicion={[6,1]}
                                className="candyInput-bodyForm-1"
                                idInput="input-modal1-primero">
                                <input type="text" id="input-modal1-primero" placeholder="primero" onChange={ (e) => setValueInput1(e.target.value)}/>
                            </CandyContainer>
                            <CandyContainer
                                posicion={[7,1]}
                                className="candyInput-bodyForm-1"
                                idInput="input-modal1-segundo">
                                <input type="text" id="input-modal1-segundo" placeholder="segundo" onChange={ (e) => setValueInput2(e.target.value)}/>
                            </CandyContainer>
                            {/*
                                En la función de onEnter, percibe los valores iniciales del state y no los actuáles...
                                Y en el click si recibe los valores actuales
                            */}
                            <CandyContainer
                                posicion={[8,1]}
                                className="candyButton-3"
                                onEnter={ handleAceptarModal }>
                                <button onClick={ () => { handleAceptarModal(); } }>Aceptar</button>
                            </CandyContainer>
                            <CandyContainer
                                posicion={[9,1]}
                                className="candyButton-3"
                                onEnter={ () => handleAceptarModal() }>
                                <button onClick={ () =>  handleAceptarModal() }>Aceptar 2</button>
                            </CandyContainer>
                        </div>
                </MiModal1>
            }
            { isOpenSecondModal && 
                <MiModal1
                    title="Alerta"
                    close={ () => setIsOpenSecondModal(false) }
                    posisionCandyClose = {[11,1]}>
                    <div>
                        <h3>Valores del state</h3>
                        <p>Inputs en el modal</p>
                        <p>input 1 = <b>{ valueInput1 }</b></p>
                        <p>input 2 = <b>{ valueInput2 }</b></p>
                    </div>
                </MiModal1>
                }
        </div>
    )
}