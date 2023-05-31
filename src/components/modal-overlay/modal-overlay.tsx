import style from './modal-overlay.module.css';
import React from 'react';

type TModalOverlayProps = {
    onClick: () => void,
}

export const ModalOverlay: React.FC<TModalOverlayProps> = ({ onClick }) => {
    return (
        <div className={style.overlay} onClick={onClick}></div>
    )
}

