import React, { useEffect } from "react"
import { createPortal } from "react-dom";
import style from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

type TModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.querySelector('#modals')!

export const Modal: React.FC<TModalProps> = ({ title, onClose, children }) => {

  useEffect(() => {
    function closeOnEsc(e: { key: string; }) {
      if (e.key === "Escape" || e.key === "Esc") {
        onClose();
      }
    }

    document.addEventListener("keyup", closeOnEsc);

    return () => {
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className={style.modal}>
        <div className={style.box_title}>
          <h1 className={style.title}>{title}</h1>
          <CloseIcon onClick={() => {
            onClose();
          }} type={"primary"} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose}></ModalOverlay>
    </>,
    modalRoot
  )
}


