import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './feed-order-item.module.css'

const FeedOrderItem: React.FC<any> = ({ props }) => {
    return (
        <div className={styles.box_big}>
            <div className={styles.box_small}>
                <p className="text text_type_digits-default">#{props}</p>
                <p className="text text_type_main-default text_color_inactive">date, time</p>
            </div>
            <h1 className="text text_type_main-medium">title</h1>
            <div className={styles.box_small}>
                <div>pictires</div>
                <div className={styles.box_small}>
                    <p className="text text_type_digits-default mr-6">123452345</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedOrderItem