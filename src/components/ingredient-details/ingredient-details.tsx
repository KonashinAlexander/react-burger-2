import cn from 'classnames';
import style from './ingredient-details.module.css';
import { TIngredientsType } from "../../utils/prop-types";
import { Navigate, useParams } from "react-router-dom";
import React from 'react';
import { useGetIngredientsQuery } from '../../services/rtk/ingredients';

export const IngredientDetails: React.FC = () => {
    const { id } = useParams()
    const { data } = useGetIngredientsQuery('BurgerIngredients')
    const item = data?.data.filter(item => item._id === id)[0]

    if (data === null) {
        return <Navigate to='/' />
    } else {
        return (
            <div className={style.box}>

                <img src={item?.image_large} alt={item?.name}></img>
                <p className="text text_type_main-medium text_color_inactive">{item?.name}</p>
                <ul className={style.list}>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')} >
                        <p className="text text_type_main-default">Калории, ккал</p>{item?.calories}
                    </li>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                        <p className="text text_type_main-default">Белки, г</p>{item?.proteins}
                    </li>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                        <p className="text text_type_main-default">Жиры, г</p>{item?.fat}
                    </li>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                        <p className="text text_type_main-default">Углеводы, г</p>{item?.carbohydrates}
                    </li>
                </ul>
            </div>
        )
    }
}

