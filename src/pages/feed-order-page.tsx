import React from 'react'
import style from './page.module.css'
import OrderInfo from '../components/order-info/order-info';

const list = [
    {
        image: 'image1',
        title: 'title1 qqqqqqqqqqqqqqq qqqqqqqqqq qqqqqqqqqq',
        price: 100,
        quantity: 3,
        id: 1
    },
    {
        image: 'image2',
        title: 'title2 gggggggggggg ggggggggg gggggggg',
        price: 200,
        quantity: 2,
        id: 2
    },
    {
        image: 'image3',
        title: 'title3 tttttttttt ttttttttttt ttttttttttttttt',
        price: 300,
        quantity: 1,
        id: 3
    },
    {
        image: 'image3',
        title: 'title3 xxxxxxxxxx xxxxxxxxx xxxxxxxxxxxx xxxxxxxxxxxxxx',
        price: 300,
        quantity: 1,
        id: 3
    },
    {
        image: 'image3',
        title: 'title3 nnnnnnnnnn nnnnnnnn nnnnnnnnnnnn nnnnnnnnnnn',
        price: 300,
        quantity: 1,
        id: 3
    },
    {
        image: 'image3',
        title: 'title3 nnnnnnnnnn nnnnnnnn nnnnnnnnnnnn nnnnnnnnnnn',
        price: 300,
        quantity: 1,
        id: 3
    },
    {
        image: 'image3',
        title: 'title3 nnnnnnnnnn nnnnnnnn nnnnnnnnnnnn nnnnnnnnnnn',
        price: 300,
        quantity: 1,
        id: 3
    }
]

const FeedOrderPage: React.FC = () => {
    return (
        <div className={style.box_order}>
            <p className="text text_type_digits-default m-0" style={{ textAlign: 'center' }}>#12344</p>
            <h1 className="text text_type_main-default m-0">TTTTTb sdfgsfdgsdfgsdfgsdfg</h1>
            <p className="text text_type_main-small" style={{ color: '#00CCCC' }}>Выполнен</p>
            <h2 className="text text_type_main-default">Состав:</h2>
            <div className="text text_type_main-default" style={{ overflow: 'scroll' }}>
                {
                    list.map((item, index) => <OrderInfo
                        key={index}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        id={item.id}
                    />)
                }
            </div>
        </div>
    )
}

export default FeedOrderPage