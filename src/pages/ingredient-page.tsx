import React from 'react'
import style from './page.module.css'
import cn from 'classnames';
import { useParams } from 'react-router-dom'
import { useGetIngredientsQuery } from '../services/rtk/ingredients';

const IngredientPage: React.FC = () => {
    const { id } = useParams()
    const { data } = useGetIngredientsQuery('')
    const item = data?.data.filter(item => item._id === id)[0]

    const content = item
        ? <div className={style.box}>
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
        : <p>Попробуйте уточнить запрос в URL</p>

    return content
}

export default IngredientPage
