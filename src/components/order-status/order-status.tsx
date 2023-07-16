import React from 'react'
import styles from './order-status.module.css'
import { IOrder } from '../../services/rtk/web-socket';

type TOrdersProps = {
    orders: IOrder[] | []
}

export const OrderStatus: React.FC<TOrdersProps> = ({ orders }) => {

    const renderOrdersReady = () => {
        return orders.map((item, index) => item.status === 'done' && <p key={index} style={{ margin: '4px', color: '#00CCCC' }}>{item.number}</p>)
    }

    const renderOrdersInProgress = () => {
        return orders.map((item, index) => item.status !== 'done' && <p key={index} style={{ margin: '4px' }}>{item.number}</p>)
    }

    return (
        <div className={styles.status_box}>
            <div>
                <p className="text text_type_main-medium">Готовы:</p>
                <div
                    className="text text_type_digits-default"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-feat, minmax(2fr, 1fr))',
                        gridAutoFlow: 'row dense',
                        maxHeight: '200px',
                        overflow: 'scroll'
                    }}>
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
        </div >
    )
}

