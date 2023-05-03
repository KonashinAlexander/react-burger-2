import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';


export const ModalOverlay = ({ onClick, onKeyDown }) => {
    return (
        <div className={style.overlay} onClick={onClick}></div>
    )
}

ModalOverlay.propsType = {
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
}