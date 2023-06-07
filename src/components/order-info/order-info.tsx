import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './order-info.module.css'

type TOrderInfo = {
    image: string,
    title: string,
    price: number,
    quantity: number,
    id: number
}

const OrderInfo: React.FC<TOrderInfo> = ({ image, title, price, quantity, id }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '16px', gap: '10px' }}>
                <div style={{ width: '64px', height: '64px' }}>{image}</div>
                <p className='ml-4 mr-4'>{title}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '16px', gap: '10px' }}>
                <p>{quantity}</p>
                <span>x</span>
                <p>{price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default OrderInfo