import cn from 'classnames';
import image from '../../images/done.svg';
import style from './order-details.module.css';
import React from 'react';
import { useAppSelector } from '../../services/hooks';

export const OrderDetails: React.FC = () => {
    const { orderId, orderName } = useAppSelector((state) => state.orderStore);

    return (
        <>
            <p className={cn(style.digits, 'text', 'text_type_digits-large')}>{orderId}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-6">{orderName}</p>
            <img className={style.image} src={image} alt='logo'></img>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-6">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

