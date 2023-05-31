import React from 'react'
import style from './page.module.css'
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { IIngredientsStore } from '../utils/prop-types';

const IngredientPage: React.FC = () => {
    const { id } = useParams()
    const details = useSelector((state: IIngredientsStore) => state.ingredientsStore.data);
    const item = details.filter(item => item._id === id)[0]

    return (
        <div className={style.box}>
            <img src={item.image_large}></img>
            <p className="text text_type_main-medium text_color_inactive">{item.name}</p>
            <ul className={style.list}>
                <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')} >
                    <p className="text text_type_main-default">Калории, ккал</p>{item.calories}
                </li>
                <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                    <p className="text text_type_main-default">Белки, г</p>{item.proteins}
                </li>
                <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                    <p className="text text_type_main-default">Жиры, г</p>{item.fat}
                </li>
                <li className={cn(style.list_item, 'text', 'text_type_digits-default', 'text_color_inactive')}>
                    <p className="text text_type_main-default">Углеводы, г</p>{item.carbohydrates}
                </li>
            </ul>
        </div>
    )
}

export default IngredientPage
