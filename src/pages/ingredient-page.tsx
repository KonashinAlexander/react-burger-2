import React from 'react'
import style from './page.module.css'
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { IIngredientsStore } from '../utils/prop-types';

const item = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
}

const IngredientPage: React.FC = () => {
    const { id } = useParams()

    console.log(id)
    // const details = useSelector((state: IIngredientsStore) => state.ingredientsStore.data);
    // const item = details.filter(item => item._id === id)[0]
    console.log(item)


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
