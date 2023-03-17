import React, { useEffect } from "react";
import PropsType from "props-type";
import style from './modal-overlay.module.css';


export const ModalOverlay = ({onClick, onKeyDown}) => {

    return (
        <div className={style.overlay} onClick={onClick}>

        </div>
    ) 
}

ModalOverlay.propsType = {
    onClick: PropsType.func,
    onKeyDown: PropsType.func
}