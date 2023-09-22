import React from 'react'
import styles from './page.module.css'
import { OrderHistory } from '../components/order-history/order-history';
import { OrderStatus } from '../components/order-status/order-status';
import { useGetOrdersQuery } from '../services/rtk/web-socket';
import { WS_URL_ALL } from '../utils/api';

const LoadingComponent: React.FC = () => {
    return <h1>Loading orders...</h1>;
};

interface TotalOrdersProps {
    total: number | undefined;
}

const TotalOrders: React.FC<TotalOrdersProps> = ({ total }) => {
    return (
        <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{total}</p>
        </div>
    );
};

const TotalOrdersToday: React.FC<{ totalToday: number | undefined }> = ({ totalToday }) => {
    return (
        <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
        </div>
    );
};

const FeedPage: React.FC = () => {
    const { data, isLoading } = useGetOrdersQuery(WS_URL_ALL);
    const orders = data?.orders ?? [];

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <section className={styles.home}>
            <div>
                <h1 className="text text_type_main-large m-6">Лента заказов</h1>
                <OrderHistory orders={orders} />
            </div>

            <div className={styles.status_box}>
                <OrderStatus orders={orders} />
                <TotalOrders total={data?.total} />
                <TotalOrdersToday totalToday={data?.totalToday} />
            </div>
        </section>
    );
};

export default FeedPage;