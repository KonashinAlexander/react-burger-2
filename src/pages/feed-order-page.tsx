import { FeedOrderDetails } from '../components/feed-order-details/feed-order-details';
import styles from './page.module.css'

const FeedOrderPage: React.FC = () => {
    console.log('FeedOrderPage')

    return (
        <div className={styles.box_page}>
            <FeedOrderDetails />
        </div>
    )
}

export default FeedOrderPage