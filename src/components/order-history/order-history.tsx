import { IOrder, IOrdersData } from '../../services/rtk/web-socket';
import FeedOrderItem from "../feed-order-item/feed-order-item"

type TOrdersProps = {
    orders: IOrder[]
}
export const OrderHistory: React.FC<TOrdersProps> = ({ orders }) => {

    const renderOrders = () => {
        return orders.map(item => <FeedOrderItem key={item._id} props={item} />)
    }

    return (
        <div style={{ height: '680px', width: '95%', overflow: 'scroll', boxSizing: 'border-box' }}>
            {
                renderOrders()
            }
        </div>
    )
}