import { Link } from 'react-router-dom';
import { useDispatch } from '@/app/store/store';
import { logoutUserThunk } from '@/entities/user/user-slice';
import Logout from '@/shared/assets/icons/logout.svg';
import styles from './login-bar.module.scss';

export const UserBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logoutUserThunk());

  return (
    <div className={styles.userBar}>
      <ul className={styles.menu}>
        <li className={styles.listItem}>
          <Link
            to='/user/profile'
            className={styles.navigationLink}
            aria-label='Перейти в личный кабинет'
          >
            Личный кабинет
          </Link>
        </li>
        <li
          tabIndex={0}
          role='button'
          className={`${styles.navigationItem} ${styles.navigationLogout}`}
          onClick={handleLogout}
          onKeyDown={handleLogout}
        >
          Выйти из аккаунта
          {<Logout />}
        </li>
      </ul>
    </div>
  );
};
