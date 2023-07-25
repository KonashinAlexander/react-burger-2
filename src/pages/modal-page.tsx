import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import styles from './page.module.css'

type TModalProps = {
    children: JSX.Element;
}

const modalRoot = document.querySelector('#modals')!

const Modal: FC<TModalProps> = ({ children }) => {
    const { state } = useLocation()
    const navigate = useNavigate()

    function onDismiss() {
        navigate(state.backgroundLocation.pathname)
    }

    useEffect(() => {
        function closeOnEsc(e: { key: string; }) {
            if (e.key === "Escape" || e.key === "Esc") {
                onDismiss();
            }
        }

        document.addEventListener('click', (e) => console.log(e.target))

        document.addEventListener("keyup", closeOnEsc);
        return () => {
            document.removeEventListener("keyup", closeOnEsc);
        }
    })

    return createPortal(
        <div className={styles.overlay} onClick={onDismiss}>
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <CloseIcon type={'primary'} onClick={onDismiss} />
                </div>
                {children}
            </div>
        </div>,
        modalRoot
    )
}

export default Modal