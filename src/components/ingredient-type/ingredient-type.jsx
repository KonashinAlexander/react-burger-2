import React, { useEffect, useState } from "react";
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames';
import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './ingredient-type.module.css'
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { addConstructor } from "../../services/reducers/constructor";

export const IngredientType = ({title, id, ingredients}) => {
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(null);
    const closeModal = () => {setShowModal(null)};

    return (
        <section className={title}>
            <h2 className={cn(style.title, "text", "text_type_main-medium")} id={id}>{title}</h2>
            <div className={cn(style.list, 'mb-10', 'pl-4', 'pr-4')}>
                {ingredients?.map(data => <BurgerIngredient 
                                                key={data._id}
                                                {...data}
                                                count = {1} 
                                                onClick={() => {
                                                    dispatch(addConstructor(data));
                                                    setShowModal(data)
                                                }}
                                             />)
                }
            </div>

            {showModal && <Modal title='Детали ингредиента' onClose={closeModal}>
                 <IngredientDetails data={showModal}/>
            </Modal>}
            
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
