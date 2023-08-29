import cn from 'classnames';
import image from '../../images/done.svg';
import style from './order-details.module.css';
import React from 'react';
import { usePostOrdersMutation } from '../../services/rtk/orders';

export const OrderDetails: React.FC = () => {


    const [postOrder, result] = usePostOrdersMutation({
        fixedCacheKey: 'shared-postOrder',
    })

    if (result.error) {
        return <p className="text text_type_main-medium">Для заказа добавьте ингредиенты</p>
    }

    return (
        <div className={style.box}>
            <p id='number' className={cn(style.digits, 'text', 'text_type_digits-large')}>{result.data?.order.number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-6">{result.data?.name}</p>
            <img className={style.image} src={image} alt='logo'></img>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-6">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

