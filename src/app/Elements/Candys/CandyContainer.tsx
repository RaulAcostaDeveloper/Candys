import { useEffect, useState } from "react";
import { CandyElement, addCandy, deleteCandy, getCandyPositionBottom, getCandyPositionLeft, getCandyPositionRight, getCandyPositionTop, posicionActual, setIsKeyListenerActive, setPosicionActualCandyMatrix } from "./CandyCrud";
import React, { ReactNode } from 'react';

type Props = {
    posicion: [number, number];
    children?: ReactNode;
    onEnter?:(...args: any[]) => void;
    onSpace?:(...args: any[]) => void;
    idInput?: string;
    className?: string;
}
export const CandyContainer = ({ children, posicion, onEnter, onSpace, idInput, className}: Props ): JSX.Element => {
    const [ isActive, setIsActive ] = useState(false)
    useEffect(()=>{
        const newCandy: CandyElement = {
            posicion,
            isActive: false,
            topPosition: getCandyPositionTop(posicion),
            bottomPosition: getCandyPositionBottom(posicion),
            leftPosition: getCandyPositionLeft(posicion),
            rightPosition: getCandyPositionRight(posicion),
            onEnter: onEnter,
            onSpace: onSpace,
            idInput: idInput,
        }
        addCandy(newCandy);
        return () => {
            deleteCandy(newCandy.posicion);
        };
    },[]);

    useEffect(()=>{
        document.addEventListener('cambioEnMatrix', handleCambioEnMatrix);
        return () => {
            document.removeEventListener('cambioEnMatrix', handleCambioEnMatrix);
        };
    },[]);

    const handleCambioEnMatrix = () => {        
        // Pregunta si este candy es active
        if (posicion[0] === posicionActual[0] && posicion[1] === posicionActual[1] ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    const handleSelect = () => {
        if (idInput) {
            const inputElement = document.getElementById(idInput);
            if (inputElement instanceof HTMLInputElement) {
                inputElement.select();
                setIsKeyListenerActive(false);
            }
        }
        setPosicionActualCandyMatrix(posicion);
    }
    return (
        <div
            className={`CandyContainer${isActive ? ' CandyActive ' : ' '}${className && className}`}
            onClick={()=> handleSelect() }>
            { children &&  children}
        </div>
    )
}