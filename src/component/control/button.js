import React from "react";

function Button(props) {
    return (
        <button style={{width: '100%', height: '100%'}} id={props.button.id} onClick={props.button.handleClick}>
            {props.button.name}
        </button>
    );
}

export default Button;