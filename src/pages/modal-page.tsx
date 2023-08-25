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

    useEffect(() => {
        function onDismiss() {
            navigate(state.backgroundLocation.pathname)
        }

        function closeOnEsc(e: { key: string; }) {
            if (e.key === "Escape" || e.key === "Esc") {
                onDismiss();
            }
        }

        function closeOnClick(e: { target: any; }) {
            const target = e.target

            if (target.localName === 'svg') {
                onDismiss()
            } else if (target.localName === 'div' && target.id === 'myOverlay') {
                onDismiss();
            }
        }

        document.addEventListener('click', closeOnClick)
        document.addEventListener("keyup", closeOnEsc);
        return () => {
            document.removeEventListener("keyup", closeOnEsc);
            document.removeEventListener('click', closeOnClick)
        }
    })

    return createPortal(
        <div className={styles.overlay} id='myOverlay'>
            <div className={styles.modal} id='myModal'>
                <div className={styles.modal_box} >
                    <CloseIcon type={'primary'} />
                </div>
                {children}
            </div>
        </div>,
        modalRoot
    )
}

export default Modal