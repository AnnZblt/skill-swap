import { Outlet } from 'react-router-dom';

import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import { userIsAuth, userState } from '@/entities/user/user-slice';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import styles from './main-layout.module.scss';

export const MainLayout = () => {
  const categories = useSelector(categoriesList);
  const isAuth = useSelector(userIsAuth);
  const user = useSelector(userState);

  return (
    <div className={styles.layout}>
      <Header
        userIsAuth={isAuth}
        searchQuery={() => {
          console.log('Search query');
        }}
        categories={categories}
        userData={user!}
      />
      <main className={styles.layoutContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
