import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useMemo } from "react"
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames'
import style from './burger-constructor.module.css'
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";




export const BurgerConstructor = ( {constructorIngredients}) => {   

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {setShowModal(false)}

    const bun = useMemo(()=>constructorIngredients.filter(data => data.name === 'Краторная булка N-200i'),[]);    
    const otherIngredients = useMemo(()=>constructorIngredients.filter(data => data.name !== 'Краторная булка N-200i'),[]);

    return (
        <>
            <div className={cn(style.container, 'pt-25')}> 

                <div className={style.box_small}>
                    {bun.map((data) =>  <ConstructorElement 
                                        {...data} 
                                        type='top' 
                                        key={data._id} 
                                        thumbnail={data.image} 
                                        text={data.name}
                                        isLocked={true}
                                        />)
                    }    
                </div>                          
            
                <div className={cn(style.box_big, 'mt-4')}>
                    {otherIngredients.map((data) => 
                                        <div className={cn(style.box_flex)} key={data._id} >
                                            <DragIcon className={cn(style.icon)} />
                                            <ConstructorElement 
                                            {...data} 
                                            key={data._id} 
                                            thumbnail={data.image} 
                                            text={data.name}
                                            isLocked={false}/>   
                                        </div>
                                        )
                    }     
                </div>

                <div className={cn(style.box_small, 'mt-4')}>
                    {bun.map((data) => <ConstructorElement 
                                        {...data} 
                                        type='bottom' 
                                        key={data._id} 
                                        thumbnail={data.image} 
                                        text={data.name}
                                        isLocked={true}
                                        />)
                    }    
                </div> 

                <div className={cn(style.box__total_flex, 'pt-10 p-4')}>
                    <div className={cn(style.box__total_flex, 'mr-10')}>
                        <p className={cn('text', 'text_type_digits-medium', 'mr-4')}>123</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button htmlType="button" size="large" onClick={() => {setShowModal(true)}}>Оформить заказ</Button>
                </div>

                {showModal && <Modal onClose={closeModal}><OrderDetails orderId={12345} />              
                </Modal>}

              

            </div> 
        
        </> 
    )    
}

BurgerConstructor.propTypes = {
    constructorIngredients: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
    })).isRequired
}

