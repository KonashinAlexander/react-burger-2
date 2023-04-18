import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useMemo } from "react"
import cn from 'classnames'
import style from './burger-constructor.module.css'
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { removeConstructor } from "../../services/reducers/constructor";
import { icrementOrderId } from "../../services/reducers/order";

export const BurgerConstructor = () => {   
    
    const { bun, ingredients } = useSelector(state => state.constructorStore)
    const buns = useSelector(state => state.ingredientsStore.data).filter(data => data.name === 'Краторная булка N-200i');
    const bunCost = buns.map((data) => { return data.price })
    const otherIngredientsCost = useMemo(()=>ingredients.map((data) => {return data.price}).reduce((sum, current) => {return sum + current}, 0), [ingredients])
   
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {setShowModal(false)};

    const orderId = useSelector(state=>state.orderStore.orderId)

    const dispatch = useDispatch();

    return ( 
        <>
            <div className={cn(style.container, 'pt-25')}> 

                <div className={style.box_small}>
                    {buns.map((data) =>  <ConstructorElement 
                                        {...data} 
                                        type='top' 
                                        key={data._id} 
                                        thumbnail={data.image} 
                                        text={`${data.name} (Верх)`}
                                        isLocked={true}
                                        />)
                    }
                </div>                          
            
                <div className={cn(style.box_big, 'mt-4')}>
                    {ingredients.map((data) => 
                                        <div className={cn(style.box_flex)} key={data._id} >
                                            <DragIcon className={cn(style.icon)} />
                                            <ConstructorElement 
                                            {...data} 
                                            key={data._id} 
                                            thumbnail={data.image} 
                                            text={data.name}
                                            isLocked={false}
                                            handleClose={()=>dispatch(removeConstructor())}/>   
                                        </div>
                                        )
                    }     
                </div>

                <div className={cn(style.box_small, 'mt-4')}>
                    {buns.map((data) => <ConstructorElement 
                                        {...data} 
                                        type='bottom' 
                                        key={data._id} 
                                        thumbnail={data.image} 
                                        text={`${data.name} (Низ)`}
                                        isLocked={true}
                                        />)
                    }    
                </div> 

                <div className={cn(style.box__total_flex, 'pt-10 p-4')}>
                    <div className={cn(style.box__total_flex, 'mr-10')}>
                        <p className={cn('text', 'text_type_digits-medium', 'mr-4')}>{bunCost * 2 + otherIngredientsCost}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button htmlType="button" size="large" onClick={() => {
                                                                    setShowModal(true)
                                                                    dispatch(icrementOrderId())
                        }}>
                        Оформить заказ
                    </Button>
                </div>

                {
                showModal && <Modal onClose={closeModal}><OrderDetails orderId={orderId} />              
                </Modal>
                }

              

            </div> 
        
        </> 
    )    
}

// BurgerConstructor.propTypes = {
//     constructorIngredients: PropTypes.arrayOf(PropTypes.shape(
//      ingredientsPropType
//     )).isRequired
// }
