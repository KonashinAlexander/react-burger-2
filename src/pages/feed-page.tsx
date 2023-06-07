import React from 'react'
import FeedOrderItem from '../components/feed-order-item/feed-order-item'

const list = [1234, 2567, 38909, 43456, 56543, 62345, 1234, 1234, 1234,]
const list2 = [17654, 27898, 39383, 47524]

const FeedPage: React.FC = () => {

    return (
        <section style={{ width: '100%', margin: '0, auto' }}>
            <h1 className="text text_type_main-large m-6">Лента заказов</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '24px', gap: '16px' }}>
                <div style={{ height: '680px', width: '95%', overflow: 'scroll' }}>
                    {
                        list.map((item, index) => <FeedOrderItem key={index} props={item} />)
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '650px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '350px', overflow: 'scroll' }}>
                        <div style={{ width: '48%' }}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className="text text_type_digits-default">
                                {
                                    list.map((item, index) => <p key={index} style={{ margin: '4px', color: '#00CCCC' }}>{item}</p>)
                                }
                            </div>
                        </div>
                        <div style={{ width: '48%' }}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className="text text_type_digits-default">
                                {
                                    list2.map((item, index) => <p key={index} style={{ margin: '4px' }}>{item}</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className="text text_type_digits-large">123</p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">123</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default FeedPage