import { ReactNode } from 'react';
import { CandyContainer } from './Candys/CandyContainer';

type Props = {
    title: string;
    children?: ReactNode;
    close: (...args: any[]) => void;
    posisionCandyClose: [number, number];
}
export const MiModal1 = ({ title, close, children, posisionCandyClose }: Props): JSX.Element => {
    return (
        <div className="containerModal">
            <div className="innerModal">
                <div className="title">
                    <h3>{ title }</h3>
                </div>
                {/* Aquí el body */}
                { children && children }
                <div className="close">
                    <CandyContainer posicion = {posisionCandyClose}
                        onEnter={ () => close() }>
                        <button onClick={ () => close() }>Cerrar</button>
                    </CandyContainer>
                </div>
            </div>
        </div>
    )
}