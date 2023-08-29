import React from 'react'
import styles from './order-status.module.css'
import cn from 'classnames'
import { IOrder } from '../../services/rtk/web-socket';

type TOrdersProps = {
    orders: IOrder[] | []
}

export const OrderStatus: React.FC<TOrdersProps> = ({ orders }) => {


    const renderOrdersReady = () => {
        return orders.map((item, index) => item.status === 'done' && <p key={index} className={styles.number_ready}>{item.number}</p>)
    }

    const renderOrdersInProgress = () => {
        return orders.map((item, index) => item.status !== 'done' && <p key={index} className={styles.number_progress}>{item.number}</p>)
    }

    return (
        <div className={styles.status_box}>
            <div>
                <p className="text text_type_main-medium">Готовы:</p>
                <div className={cn(styles.box_ready, "text text_type_digits-default")}>
                    {
                        renderOrdersReady()
                    }
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium">В работе:</p>
                <div className={cn(styles.box_progress, "text text_type_digits-default")}>
                    {
                        renderOrdersInProgress()
                    }
                </div>
            </div>
        </div >
    )
}

