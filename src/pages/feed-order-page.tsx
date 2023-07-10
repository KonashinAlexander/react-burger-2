import React from 'react'
import style from './page.module.css'
import { useLocation } from 'react-router-dom';
import { useGetIngredientsQuery } from '../services/rtk/ingredients';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TCounts = {
    _id: string,
    count: number,
    price: number,
    image: string,
    name: string,
}

const FeedOrderPage: React.FC = () => {

    const { state } = useLocation()
    const { ingredients } = state
    const { data, isLoading } = useGetIngredientsQuery('')
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '16px' }} key={item._id}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '16px', gap: '10px' }}>
                    <img style={{ width: '64px', height: '64px' }} src={item.image} alt={item.name} />
                    <p className='ml-4 mr-4'>{item.name}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '16px', gap: '10px' }}>
                    {item.count}
                    <span>x</span>
                    <p>{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        ))
    }

    const translateStatus = () => {
        return state.status === 'done' ? 'Выполнен' : 'В работе'
    }

    const today = new Date()
    const date = new Date(state.createdAt)
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
            <p className="text text_type_digits-default m-0" style={{ textAlign: 'center' }}>#{state.number}</p>
            <h1 className="text text_type_main-default m-0">{state.name}</h1>
            <p className="text text_type_main-small" style={{ color: '#00CCCC' }}>
                {
                    translateStatus()
                }
            </p>
            <h2 className="text text_type_main-default">Состав:</h2>
            <div className="text text_type_main-default" style={{ overflow: 'scroll' }}>
                {
                    renderIngredients()
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {
                    renderDay()
                }
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="text text_type_digits-default mr-4">{sum}</p>
                    <CurrencyIcon type={'primary'} />
                </div>

            </div>

        </div>

    return content
}

export default FeedOrderPage