import React from 'react'
import style from './orders-details.module.css'
import cn from 'classnames'
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useGetIngredientsQuery } from '../../services/rtk/ingredients';
import { useGetOrdersQuery } from '../../services/rtk/web-socket';
import { WS_URL_ALL } from '../../utils/api';

type TCounts = {
    _id: string,
    count: number,
    price: number,
    image: string,
    name: string,
}

export const FeedOrderDetails: React.FC = () => {

    const { id } = useParams()

    const { data: orders } = useGetOrdersQuery(WS_URL_ALL);
    const order = orders?.orders.filter(order => order._id === id)[0]!
    const ingredients = order?.ingredients!


    const { data, isLoading } = useGetIngredientsQuery('BurgerIngredients')
    const uniqueIds: string[] = Array.from(new Set(ingredients))
    const counts: TCounts[] = []

    uniqueIds.forEach((item) => {
        const i = {
            _id: '',
            count: 0,
            price: 0,
            image: '',
            name: ''
        }

        i._id = item
        i.count = ingredients.filter((id: unknown) => id === item).length

        counts.push(i)

        data?.data.forEach(data => {
            if (data._id === item) {
                i.price = data.price
                i.image = data.image
                i.name = data.name
            }
        })
    })

    const renderIngredients = () => {
        return counts.map((item) => (
            <div className={style.box_ingredient}
                key={item._id}
            >
                <div className={style.box_main}>
                    <img className={style.image}
                        src={item.image}
                        alt={item.name}
                    />
                    <p className='ml-4 mr-4'>{item.name}</p>
                </div>
                <div className={style.box_main}>
                    {item.count}
                    <span>x</span>
                    <p>{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        ))
    }

    const translateStatus = () => {
        return order?.status === 'done' ? 'Выполнен' : 'В работе'
    }

    const today = new Date()
    const date = new Date(order?.createdAt)
    const diff = (today.getDay() - date.getDay())
    const time = date.toLocaleTimeString()

    const renderDay = () => {
        return diff === 0
            ? <p className="text text_type_main-default text_color_inactive">
                Сегодня, {time}
            </p>
            : diff === 1
                ? <p className="text text_type_main-default text_color_inactive">
                    Вчера, {time}
                </p>
                : diff === 2 || diff === 3 || diff === 4
                    ? <p className="text text_type_main-default text_color_inactive">
                        {`${diff} дня назад`}, {time}
                    </p>
                    : <p className="text text_type_main-default text_color_inactive">
                        {`${diff} дней назад`}, {time}
                    </p>
    }

    const sum = counts.reduce((accumulator, item) => accumulator + (item.price * item.count), 0)

    const content = isLoading
        ? <h1>Loading ingredients...</h1>
        : <div className={style.box_order}>
            <p className={cn(style.box_number, "text text_type_digits-default m-0")}>
                #{order?.number}
            </p>
            <h1 className="text text_type_main-default m-0">
                {order?.name}
            </h1>
            <p className={cn(style.box_status, "text text_type_main-small left")}>
                {
                    translateStatus()
                }
            </p>
            <h2 className="text text_type_main-default">Состав:</h2>
            <div className={cn(style.box_list, "text text_type_main-default")}>
                {
                    renderIngredients()
                }
            </div>
            <div className={style.box_day}>
                {
                    renderDay()
                }
                <div className={style.box_day}>
                    <p className="text text_type_digits-default mr-4">{sum}</p>
                    <CurrencyIcon type={'primary'} />
                </div>

            </div>

        </div>

    return content

    // return <h1>Under construction</h1>
}

