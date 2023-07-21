
import { ProfileOrderDetails } from '../components/feed-order-details/profile-order-details';
import styles from './page.module.css'

function ProfileSingleOrderPage() {
    return (
        <div className={styles.box_page}>
            <ProfileOrderDetails />

        </div>
    )
}

export default ProfileSingleOrderPage