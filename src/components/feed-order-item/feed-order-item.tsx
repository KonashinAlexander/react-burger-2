import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './feed-order-item.module.css'
import { TFeedOrderItemProps, TIngredientsType } from '../../utils/prop-types';
import { useGetIngredientsQuery } from '../../services/rtk/ingredients';


const FeedOrderItem: React.FC<TFeedOrderItemProps> = ({ props }) => {

    const { data } = useGetIngredientsQuery('');
    const orderIdsList = props.ingredients;
    const list: TIngredientsType[] = [];

    orderIdsList.forEach(item => {
        data?.data.forEach(data => {
            if (data._id === item) {
                list.push(data)
            }
        })
    })

    const sum = list.reduce((accumulator, item) => accumulator + item.price, 0)

    const today = new Date()
    const date = new Date(props.createdAt)
    const diff = (today.getDay() - date.getDay())
    const time = date.toLocaleTimeString()

    return (
        <div className={styles.box_big} >
            <div className={styles.box_small}>
                <p className="text text_type_digits-default">#{props.number}</p>
                {
                    diff === 0
                        ? <p className="text text_type_main-default text_color_inactive">Сегодня, {time}</p>
                        : diff === 1
                            ? <p className="text text_type_main-default text_color_inactive">вчера, {time}</p>
                            : diff === 2 || diff === 3 || diff === 4
                                ? <p className="text text_type_main-default text_color_inactive">{`${diff} дня назад`}, {time}</p>
                                : <p className="text text_type_main-default text_color_inactive">{`${diff} дней назад`}, {time}</p>
                }
            </div>
            <h1 className="text text_type_main-medium">{props.name}</h1>
            <div className={styles.box_small}>
                <div className={styles.pictures}>
                    {
                        list.map((item, index) => (
                            <img src={item.image} alt={item.name} className={styles.image} key={index}></img>
                        ))
                    }
                </div>
                <div className={styles.box_small}>
                    <p className="text text_type_digits-default mr-6">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedOrderItem