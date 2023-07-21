import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';

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
        <div className='overlay'
            onClick={onDismiss}
            style={{
                position: "absolute",
                top: '0',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0,0,0,.5)'

            }}>
            <div
                className='modal'
                style={{
                    boxSizing: 'content-box',
                    background: '#1C1C21',
                    borderRadius: '40px',
                    padding: '20px'
                }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>

                    <CloseIcon type={'primary'} onClick={onDismiss} />
                </div>
                {children}


            </div>
        </div>,
        modalRoot
    )
}

export default Modal