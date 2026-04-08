import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { MainLayout } from '@/app/providers/layouts/main-layout';
import { Login } from '@/pages/Login';
import { MainPage } from '@/pages/MainPage';
import { PageNotFound } from '@/pages/Page404';
import { PageError500 } from '@/pages/Page500';
import { RelatedPage } from '@/pages/RelatedPage';
import { Registration } from '@/pages/Registration';
import { SkillPage } from '@/pages/SkillPage';
import { SubcategoryPage } from '@/pages/SubcategoryPage';
import { TestPage } from '@/pages/TestPage';
import { UserFavorite } from '@/pages/UserFavorite';
import { UserProfile } from '@/pages/UserProfile';
import { UserRequests } from '@/pages/UserRequests';
import { UserSkills } from '@/pages/UserSkills';
import { UserSwaps } from '@/pages/UserSwaps';

import { Modal } from '@/shared/ui/modal';

export const AppRouter = () => {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<MainPage pageVariant='main' />} />
          <Route path=':subcategoryId' element={<SubcategoryPage />} />
          <Route path='skills/:id' element={<SkillPage />} />
          <Route path='error500' element={<PageError500 />} />
          {/*<Route path='test' element={<TestPage />} /> */}
          <Route path='related/:pathName' element={<RelatedPage />} />
          <Route path='*' element={<PageNotFound />} />
          <Route
            path='login'
            element={
              <Modal zIndex={10} mode='fullscreen' onClose={() => navigate(-1)}>
                <Login />
              </Modal>
            }
          />
          <Route
            path='register'
            element={
              <Modal zIndex={10} mode='fullscreen' onClose={() => navigate(-1)}>
                <Registration />
              </Modal>
            }
          />
          <Route path='user'>
            <Route path='requests' element={<UserRequests />} />
            <Route path='swaps' element={<UserSwaps />} />
            <Route path='favorite' element={<UserFavorite />} />
            <Route path='skills' element={<UserSkills />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
