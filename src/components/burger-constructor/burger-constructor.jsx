import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useMemo } from "react"
import { useDrop } from 'react-dnd'
import cn from 'classnames'
import style from './burger-constructor.module.css'
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { removeConstructor } from "../../services/reducers/constructor";
import { updateOrderDetails } from "../../services/reducers/order";
import { checkResponse, API_URL } from "../../utils/api";
import { addConstructor } from "../../services/reducers/constructor"
import { addCurrentIngredient } from "../../services/reducers/currentIngredient";

export const BurgerConstructor = () => {   

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item)=>{
            dispatch(addConstructor(item))
            dispatch(addCurrentIngredient(item))
        },
    }))
    
    const dispatch = useDispatch();
    const buns = useSelector(state => state.constructorStore.buns) 
    const ingredients = useSelector(state => state.constructorStore.ingredients) 
    const ingredientsIds = useSelector(state => state.constructorStore.ingredientsIds) 
    const {orderId, orderName} = useSelector(state=>state.orderStore)

    
    const otherIngredients = ingredients.filter(item => item.type !== 'bun')

    const bunsCost = useMemo(()=>buns.map((data) => {return data.price}).reduce((sum, current) => {return sum + current}, 0), [ingredients])
    const otherIngredientsCost = useMemo(()=>otherIngredients.map((data) => {return data.price}).reduce((sum, current) => {return sum + current}, 0), [ingredients])
   
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {setShowModal(false)};   

    const getOrder = (ingredientsIds) => {
        const newOrder = {"ingredients": ingredientsIds}

        return fetch(`${API_URL}/orders`, {
            method: 'POST', 
            body: JSON.stringify(newOrder), 
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(checkResponse)
            .then(dataOrder => {
                if(dataOrder.success) {
                    dispatch(updateOrderDetails(dataOrder))
                }
            })
            .catch(err=>{console.log('getOrder error >>', err)})
      }

    return ( 
        <>
            <div className={cn(style.container, 'pt-25')}> 

                <div className={style.box_small}>
                    
                    {buns.map((data) =>  <ConstructorElement 
                                        {...data} 
                                        type='top' 
                                        key={data.uuid} 
                                        thumbnail={data.image} 
                                        text={`${data.name} (Верх)`}
                                        isLocked={true}
                                        />)
                    }
                </div>                          

              
            
                <div className={cn(style.box_big, 'mt-4')} ref={drop}>
                    {otherIngredients.map((data) => 
                                        <div className={cn(style.box_flex)} key={data.uuid} >
                                            <DragIcon className={cn(style.icon)} />
                                            <ConstructorElement 
                                            {...data} 
                                            key={data.uuid} 
                                            thumbnail={data.image} 
                                            text={data.name}
                                            isLocked={false}
                                            handleClose={()=>dispatch(removeConstructor(data))}/>   
                                        </div>
                                        )
                    }     
                </div>

                <div className={cn(style.box_small, 'mt-4')}>
                    {buns.map((data) => <ConstructorElement 
                                        {...data} 
                                        type='bottom' 
                                        key={data.uuid} 
                                        thumbnail={data.image} 
                                        text={`${data.name} (Низ)`}
                                        isLocked={true}
                                        />)
                    }    
                </div> 




                <div className={cn(style.box__total_flex, 'pt-10 p-4')}>
                    <div className={cn(style.box__total_flex, 'mr-10')}>
                        <p className={cn('text', 'text_type_digits-medium', 'mr-4')}>{bunsCost*2 + otherIngredientsCost}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button htmlType="button" size="large" onClick={() => {
                                                                    setShowModal(true)
                                                                    getOrder(ingredientsIds)
                        }}>
                        Оформить заказ
                    </Button>
                </div>

                {
                showModal && <Modal onClose={closeModal}><OrderDetails orderId={orderId} orderName={orderName}/>              
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
