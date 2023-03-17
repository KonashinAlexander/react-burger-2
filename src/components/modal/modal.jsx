import React, { useEffect, useState , setState} from "react"
import { createPortal } from "react-dom";
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames';
import style from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.querySelector('#modals')

export const Modal = ({ title, onClose, children }) => { 

    useEffect(() => {        
        function closeOnEsc(e) {
          if (e.key === "Escape" || e.key === "Esc") {
            onClose();
          }
        }

        document.addEventListener("keyup", closeOnEsc);
    
        return () => {
          document.removeEventListener("keyup", closeOnEsc);
        };
      }, [onClose]);

    return createPortal (
    <>
        <div className={style.modal}>
            <div className={style.box_title}>
                <h1 className={style.title}>{title}</h1>
                <CloseIcon onClick={onClose}/>
            </div>
            {children}
        </div>
        <ModalOverlay onClick={onClose}></ModalOverlay>
    </>, 
    modalRoot
    )
}



Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.any
}
