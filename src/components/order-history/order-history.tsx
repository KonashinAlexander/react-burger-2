import { IOrder } from '../../services/rtk/web-socket';
import FeedOrderItem from "../feed-order-item/feed-order-item"
import styles from './order-history.module.css'

type TOrdersProps = {
    orders: IOrder[] | []
}
export const OrderHistory: React.FC<TOrdersProps> = ({ orders }) => {

    const renderOrders = () => {
        return orders.map(item => <FeedOrderItem key={item._id} props={item} />)
    }

    return (
        <div className={styles.box_history}>
            {
                renderOrders()
            }
        </div>
    )
}