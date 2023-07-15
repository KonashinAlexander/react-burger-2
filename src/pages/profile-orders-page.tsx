import React from 'react'
import { OrderHistory } from '../components/order-history/order-history'
import { useAppSelector } from '../services/hooks';
import { selectCurrentAccessToken } from '../services/reducers/authSlice';
import { useGetOrdersQuery } from '../services/rtk/web-socket';
import { WS_URL_USER } from '../utils/api';

const ProfileOrdersPage: React.FC = () => {
    const currentAccessToken = useAppSelector(selectCurrentAccessToken).split('Bearer ')[1]

    const { data, isLoading } = useGetOrdersQuery(`${WS_URL_USER}?token=${currentAccessToken}`);
    const orders = data ? data.orders : []

    const content = isLoading
        ? <h1>Loading order history</h1>
        : <OrderHistory orders={orders} />

    return content
}

export default ProfileOrdersPage