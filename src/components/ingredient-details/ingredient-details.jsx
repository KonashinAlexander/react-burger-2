import React from "react"
import cn from 'classnames';
import style from './ingredient-details.module.css';
import PropTypes, { number, string } from 'prop-types';
import { ingredientsPropType } from "../../utils/prop-types";
import { Navigate } from "react-router-dom";

export const IngredientDetails = ({ data }) => {

    if (data === null) {
        return <Navigate to='/' />
    } else {
        return (
            <>
                <img src={data.image_large}></img>
                <p className="text text_type_main-medium text_color_inactive">{data.name}</p>
                <ul className={style.list}>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')} >
                        <p className="text text_type_main-default">Калории, ккал</p>{data.calories}
                    </li>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                        <p className="text text_type_main-default">Белки, г</p>{data.proteins}
                    </li>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                        <p className="text text_type_main-default">Жиры, г</p>{data.fat}
                    </li>
                    <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                        <p className="text text_type_main-default">Углеводы, г</p>{data.carbohydrates}
                    </li>
                </ul>
            </>
        )
    }

    // return (
    //     <>
    //         <img src={data.image_large}></img>
    //         <p className="text text_type_main-medium text_color_inactive">{data.name}</p>
    //         <ul className={style.list}>
    //             <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')} >
    //                 <p className="text text_type_main-default">Калории, ккал</p>{data.calories}
    //             </li>
    //             <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
    //                 <p className="text text_type_main-default">Белки, г</p>{data.proteins}
    //             </li>
    //             <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
    //                 <p className="text text_type_main-default">Жиры, г</p>{data.fat}
    //             </li>
    //             <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
    //                 <p className="text text_type_main-default">Углеводы, г</p>{data.carbohydrates}
    //             </li>
    //         </ul>
    //     </>
    // )
}

IngredientDetails.propTypes = {
    data: PropTypes.shape(ingredientsPropType)
}