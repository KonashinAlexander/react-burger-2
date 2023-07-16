import React from 'react'
import styles from './page.module.css'
import { OrderHistory } from '../components/order-history/order-history';
import { OrderStatus } from '../components/order-status/order-status';
import { useGetOrdersQuery } from '../services/rtk/web-socket';
import { WS_URL_ALL } from '../utils/api';

const FeedPage: React.FC = () => {
    const { data, isLoading } = useGetOrdersQuery(WS_URL_ALL);
    const orders = data ? data.orders : []

    const content = isLoading
        ? <h1>Loading orders...</h1>
        : <section className={styles.home}>
            <div>
                <h1 className="text text_type_main-large m-6">Лента заказов</h1>
                <OrderHistory orders={orders} />
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '80px' }}>
                <OrderStatus orders={orders} />

                <div>
                    <p className="text text_type_main-medium">Выполнено за все время:</p>
                    <p className="text text_type_digits-large">{data?.total}</p>
                </div>

                <div>
                    <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large">{data?.totalToday}</p>
                </div>
            </div>

        </section>
    return content
}

export default FeedPage