import React from 'react'
import { OrderHistory } from '../components/order-history/order-history'
import { useGetOrdersQuery } from '../services/rtk/web-socket';
import { WS_URL_ALL } from '../utils/api';

const ProfileOrdersPage: React.FC = () => {
    const { data, isLoading } = useGetOrdersQuery(WS_URL_ALL);
    const orders = data ? data.orders : []

    const content = isLoading
        ? <h1>Loading order history</h1>
        : <OrderHistory orders={orders} />

    return content
}

export default ProfileOrdersPage