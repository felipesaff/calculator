import React from "react";
import './display.css';

const Display = props => {
    return(
        <div className="display">
            <div className="number"> {props.value} </div>
        </div>
    )
}

export default Display