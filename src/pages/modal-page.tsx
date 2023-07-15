import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { createPortal } from 'react-dom';
import IngredientPage from './ingredient-page';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import FeedOrderPage from './feed-order-page';

const modalRoot = document.querySelector('#modals')!

const Modal = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const isIngredient = useMatch('ingredients/:id')
    const isOrder = useMatch('feed/:id')
    const isProfileOrder = useMatch('profile/orders/:id')

    console.log(isIngredient, isOrder, isProfileOrder)

    function onDismiss() {
        // navigate(-1)
        navigate(state.backgroundLocation.pathname)
    }

    useEffect(() => {
        function closeOnEsc(e: { key: string; }) {
            if (e.key === "Escape" || e.key === "Esc") {
                onDismiss();
            }
        }
        document.addEventListener("keyup", closeOnEsc);
        return () => {
            document.removeEventListener("keyup", closeOnEsc);
        }
    })

    return createPortal(
        <div onClick={onDismiss}
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
            <div style={{
                boxSizing: 'content-box',
                background: '#1C1C21',
                borderRadius: '40px',
                padding: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>

                    <CloseIcon type={'primary'} onClick={onDismiss} />
                </div>
                {
                    isIngredient && <IngredientPage />
                }

                {
                    (isOrder || isProfileOrder) && <FeedOrderPage />
                }



            </div>

        </div>,
        modalRoot
    )
}

export default Modal