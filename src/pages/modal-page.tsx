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

    const handleDocumentClick = (e: MouseEvent) => {
        closeOnClick(e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        closeOnEsc(e);
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
            document.removeEventListener('keyup', handleKeyUp);
        };
    })

    const onDismiss = () => {
        navigate(state.backgroundLocation.pathname)
    }

    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Esc") {
            onDismiss();
        }
    }

    const closeOnClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.localName === 'svg') {
            onDismiss()
        } else if (target.localName === 'div' && target.id === 'myOverlay') {
            onDismiss();
        }
    }

    return createPortal(
        <div className={styles.overlay} id='myOverlay'>
            <div className={styles.modal} id='myModal'>
                <div className={styles.modal_box} >
                    <CloseIcon type={'primary'} />
                </div>
                {
                    children ? children : <h1>Loading data...</h1>
                }
            </div>
        </div>,
        modalRoot
    )
}

export default Modal