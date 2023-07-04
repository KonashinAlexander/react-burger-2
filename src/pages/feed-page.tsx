import React, { useState } from 'react'
import FeedOrderItem from '../components/feed-order-item/feed-order-item';
import { Modal } from '../components/modal/modal';
import OrderInfo from '../components/order-info/order-info';
import { useGetOrdersQuery } from '../services/rtk/web-socket';
import { WS_URL_ALL } from '../utils/api';

const FeedPage: React.FC = () => {
    const { data } = useGetOrdersQuery(WS_URL_ALL);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <section style={{ width: '100%', margin: '0, auto' }}>
            <h1 className="text text_type_main-large m-6">Лента заказов</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '24px', gap: '16px' }}>
                <div style={{ height: '680px', width: '95%', overflow: 'scroll', boxSizing: 'border-box' }}>
                    {
                        data?.orders.map(item => <FeedOrderItem key={item._id} props={item} />)
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '350px' }}>
                        <div>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div
                                className="text text_type_digits-default"
                                style={{ display: 'grid', gridTemplateRows: 'repeat(10, 1fr)', gridAutoFlow: 'column dense' }}>
                                {
                                    data?.orders.map((item, index) => item.status === 'done' && <p key={index} style={{ margin: '4px', color: '#00CCCC' }}>{item.number}</p>)
                                }
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className="text text_type_digits-default" style={{ overflow: 'scroll', maxHeight: '90%' }}>
                                {
                                    data?.orders.map((item, index) => item.status !== 'done' && <p key={index} style={{ margin: '4px' }}>{item.number}</p>)
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



    )
}

export default FeedPage