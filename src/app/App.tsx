import './styles/index.scss';
import { useEffect } from 'react';
import { AppRouter } from '@/app/providers/router/app-router';

import { getCategoriesThunk } from '../entities/categories/categories-slice';
import { getSkillsThunk } from '../entities/skills/skills-slice';
import { getUserThunk } from '../entities/user/user-slice';

import { useDispatch, useSelector } from './store/store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getSkillsThunk());
    dispatch(getUserThunk());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
