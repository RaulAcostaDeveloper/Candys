const pop = new Audio('./sounds/pop.mp3');
const click = new Audio('./sounds/click.mp3');

type Posicion = [number, number];
export type CandyElement = {
    posicion: Posicion;
    isActive: boolean;
    topPosition: Posicion;
    bottomPosition: Posicion;
    leftPosition: Posicion;
    rightPosition: Posicion;
    onEnter?:(...args: any[]) => void;
    onSpace?:(...args: any[]) => void;
    idInput?: string;
}

// Variables 

export let CandyMatix: CandyElement[] = [];

const posicionInicial: Posicion = [1,1];

export let posicionActual: Posicion = posicionInicial;

let indexCandyActual = 0;

let isKeyListenerActive = true;

// -------------------------------------------------------
// Imprimir
export const printCandyMatrix = () => {
    console.log('CandyMatrix ', CandyMatix);
}

// -------------------------------------------------------
export const setIsKeyListenerActive = (toogle: boolean) => {
    isKeyListenerActive = toogle;
}
// Escucha el evento en el candy
const mandarAlertaDeCambioDeMatrix = () => {
    const event = new CustomEvent("cambioEnMatrix", {});
    document.dispatchEvent(event)
}

// -------------------------------------------------------
// Posicion actual
export const setPosicionActualCandyMatrix = (posicion: Posicion) => {
    setTimeout(() => {
        // Quita el active de todas las posiciones
        // Y activa el candy si coincide con la posición dada
        let huboCandy = false;
        CandyMatix.map((candy)=>{
            if (candy.isActive) {
                candy.isActive = false;
            }
            if (candy.posicion[0] === posicion[0] && candy.posicion[1] === posicion[1]) {
                candy.isActive = true;
                huboCandy = true;
            }
        });
        if (!huboCandy) {
            console.log('ERROR CANDY');
            console.log('No se encontró candy en la posición ', posicion);        
        }
        posicionActual = posicion;
        indexCandyActual = findCandyIndexByPosision(posicionActual);    
        mandarAlertaDeCambioDeMatrix();
    }, 10);
}

// -------------------------------------------------------
// Crud
export const addCandy = (newCandy: CandyElement) => {
    if (findCandyIndexByPosision(newCandy.posicion) != 0) {
        deleteCandy(newCandy.posicion);
    }
    CandyMatix.push(newCandy);
}
export const deleteCandy = (posicion: Posicion) => {
    CandyMatix.splice(findCandyIndexByPosision(posicion), 1);
}
export const findCandyIndexByPosision = (posicion: Posicion): number => {
    let indice:number = 0;
    const candysFiltrados = CandyMatix.filter((CandyPosition, index) => {
        if (CandyPosition.posicion[0] === (posicion[0]) && CandyPosition.posicion[1] === (posicion[1]) ) {
            indice= index;
            return true
        }
    });
    return indice;
}

// -------------------------------------------------------
// Posiciones
export const getCandyPositionTop = (posicion: Posicion): Posicion => {
    const columna: number = posicion[0] -1;
    const fila: number = posicion[1];
    let resultado: Posicion = posicion;
    if (columna > 0) {
        for (let index = 0; index < posicion[1]; index++) {
            if (existePosicion([columna, fila - index])) {
                const posicionArriba: Posicion= [columna, fila - index];
                resultado = posicionArriba;
                index = posicion[1];
            }
        }
    }
    return resultado;
}
export const getCandyPositionBottom = (posicion: Posicion): Posicion=> {
    const columna: number = posicion[0] + 1;
    const fila: number = posicion[1];
    let resultado: Posicion= posicion;
    if (columna > 0) {
        for (let index = 0; index < posicion[1]; index++) {
            if (existePosicion([columna, fila - index])) {
                const posicionAbajo: Posicion= [columna, fila - index];
                resultado = posicionAbajo;
                index = posicion[1];
            }
        }
    }
    return resultado;
}
export const getCandyPositionRight = (posicion: Posicion): Posicion => {
    const columna: number = posicion[0];
    const fila: number = posicion[1] + 1;
    if (existePosicion([columna,fila])) {
        const posicionDerecha: Posicion = [columna,fila];
        return posicionDerecha
    } else {
        return posicion;
    }
}
export const getCandyPositionLeft = (posicion: Posicion): Posicion => {
    const columna: number = posicion[0];
    const fila: number = posicion[1] - 1;
    if (fila > 0) {
        if (existePosicion([columna,fila])) {
            const posicionIzquierda: Posicion = [columna, fila];
            return posicionIzquierda
        } else {
            return posicion;
        }
    } else {
        return posicion;
    }
}
export const existePosicion = (posicion: Posicion): boolean => {
    let resultado: boolean = false;
    CandyMatix.forEach((candy)=>{
        if (candy.posicion[0] === posicion[0]) {
            if (candy.posicion[1] === posicion[1]) {
                resultado = true;
            }
        }
    })
    return resultado;
}

// -------------------------------------------------------
// Escucha de eventos del teclado
const handleKeyUp = (event: any): void => {
    let key: string = event.code || String.fromCharCode(event.keyCode || event.which);
    if (isKeyListenerActive) {        
        switch (key.toLowerCase()) {
            case 'arrowdown':
                setPosicionActualCandyMatrix(getCandyPositionBottom(posicionActual));
                pop.play();
                break;
            case 'keys':
                setPosicionActualCandyMatrix(getCandyPositionBottom(posicionActual));
                pop.play();
                break;
            case 'arrowleft':
                setPosicionActualCandyMatrix(getCandyPositionLeft(posicionActual));
                pop.play();
                break;
            case 'keya':
                setPosicionActualCandyMatrix(getCandyPositionLeft(posicionActual));
                pop.play();
                break;
            case 'arrowup':
                setPosicionActualCandyMatrix(getCandyPositionTop(posicionActual));
                pop.play();
                break;
            case 'keyw':
                setPosicionActualCandyMatrix(getCandyPositionTop(posicionActual));
                pop.play();
                break;
            case 'arrowright':
                setPosicionActualCandyMatrix(getCandyPositionRight(posicionActual));
                pop.play();
                break;
            case 'keyd':
                setPosicionActualCandyMatrix(getCandyPositionRight(posicionActual));
                pop.play();
                break;
            case 'enter': // ENTER EVENT and Enter to input
                CandyMatix[indexCandyActual].onEnter?.();
                const thisIdInput = CandyMatix[indexCandyActual].idInput
                if (thisIdInput) {
                    const inputElement = document.getElementById(thisIdInput);
                    if (inputElement instanceof HTMLInputElement) {
                        inputElement.select();
                        isKeyListenerActive = false;
                    }
                }
                click.play();
                break;
            case 'space': // SPACE EVENT
                CandyMatix[indexCandyActual].onSpace?.();
                click.play();
            break;
            default:
                break;
        }
    } else {
        switch (key.toLowerCase()) {
            case 'enter': // ENTER to exit an input
            const thisIdInput = CandyMatix[indexCandyActual].idInput
            if (thisIdInput) {
                const inputElement = document.getElementById(thisIdInput);
                if (inputElement instanceof HTMLInputElement) {
                    inputElement.blur();
                    isKeyListenerActive = true;
                }
            }
            break;
        }
    }
}

// Ejecución inicial
document.addEventListener('keyup', handleKeyUp);

// Previene el presionado de la tecla tab
document.addEventListener("keydown", function(event) {             
    if (event.keyCode == 9) {
        event.preventDefault();
    }
});