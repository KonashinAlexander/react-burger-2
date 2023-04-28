import cn from 'classnames';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import image from '../../images/done.svg';
import style from './order-details.module.css';

export const OrderDetails = () => {

    const { orderId, orderName } = useSelector((state) => state.orderStore);

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

// OrderDetails.propTypes = {
//     orderId: PropTypes.number,
//     orderName: PropTypes.string
// } 