import React, { useState } from 'react'
import FeedOrderItem from '../components/feed-order-item/feed-order-item';
import { Modal } from '../components/modal/modal';
import { OrderHistory } from '../components/order-history/order-history';
import { useGetOrdersQuery, IOrdersData } from '../services/rtk/web-socket';
import { WS_URL_ALL } from '../utils/api';

const FeedPage: React.FC = () => {
    const { data, isLoading } = useGetOrdersQuery(WS_URL_ALL);
    const [showModal, setShowModal] = useState(false);
    const orders = data ? data.orders : []

    const closeModal = () => {
        setShowModal(false);
    };

    const renderOrdersReady = () => {
        return orders.map((item, index) => item.status === 'done' && <p key={index} style={{ margin: '4px', color: '#00CCCC' }}>{item.number}</p>)
    }

    const renderOrdersInProgress = () => {
        return orders.map((item, index) => item.status !== 'done' && <p key={index} style={{ margin: '4px' }}>{item.number}</p>)
    }

    const content = isLoading
        ? <h1>Loading orders...</h1>
        : <section style={{ width: '100%', margin: '0, auto' }}>
            <h1 className="text text_type_main-large m-6">Лента заказов</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '24px', gap: '16px' }}>
                <OrderHistory orders={orders} />

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '350px' }}>
                        <div>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div
                                className="text text_type_digits-default"
                                style={{ display: 'grid', gridTemplateRows: 'repeat(10, 1fr)', gridAutoFlow: 'column dense' }}>
                                {
                                    renderOrdersReady()
                                }
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className="text text_type_digits-default" style={{ overflow: 'scroll', maxHeight: '90%' }}>
                                {
                                    renderOrdersInProgress()
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className="text text_type_digits-large">{data?.total}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{data?.totalToday}</p>
                    </div>
                </div>
            </div>

            {showModal && (
                <Modal onClose={closeModal} title={'Modal'}>

                </Modal>
            )}
        </section>

    return content
}

export default FeedPage