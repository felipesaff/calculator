import React from "react";
import './button.css';

const Button = props => {
    const digito = props.digito;

    return(
        <>
           <button className={`botao ${digito === '/' ||
                                    digito === '*' ||
                                    digito === '-' ||
                                    digito === '+' ||
                                    digito === '=' ? 
                                    'operador' : ''}
                                    ${digito === '0' ||
                                    digito === 'AC' ?
                                    'duplo' : ''}`}
                    onClick={e => props.click(e.target.innerHTML)}>
            {digito}
           </button>
        </>
    )
}

export default Button