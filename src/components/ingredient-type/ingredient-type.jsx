import React, { useEffect, useRef, useState } from "react";
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames';
import style from './ingredient-type.module.css'
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'

const IngredientType = ({title, id, ingredients}, ref) => {
    const dispatch = useDispatch()
    const ingredientsIds = useSelector(state => state.constructorStore.ingredientsIds) 
    // const bunsIds = useSelector(state => state.constructorStore.bunsIds) 
    // const ref = useRef(null)
    // console.log(title, ref.current.getBoundingClientRect().top)

    return (
        <section className={title} ref={ref}>
            <h2 className={cn(style.title, "text", "text_type_main-medium")} id={id}>{title}</h2>
            <div className={cn(style.list, 'mb-10', 'pl-4', 'pr-4')}>
                {ingredients?.map(data => <BurgerIngredient
                                                key={data._id}
                                                {...data}
                                                count = {ingredientsIds.filter(id => id === data._id).length} 
                                                // countBuns = {bunsIds.filter(id => id === data._id).length}                                        
                                             />)
                }
            </div>         
        </section>
    )
}

IngredientType.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
    }))
}

export default React.forwardRef(IngredientType)