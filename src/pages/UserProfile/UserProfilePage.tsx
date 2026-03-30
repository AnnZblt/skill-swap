import { UserCabinet } from '@/widgets/user-cabinet';
import styles from './UserProfilePage.module.scss';

export const UserProfile = () => (
  <div className={styles.contentWrapper}>
    <UserCabinet />
  </div>
);
