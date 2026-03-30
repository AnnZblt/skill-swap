import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { TCategories, TUser } from '@/api/types';

import ArrowDown from '@/shared/assets/icons/chevron-down.svg';
import Heart from '@/shared/assets/icons/like.svg';
import Moon from '@/shared/assets/icons/moon.svg';
import Bell from '@/shared/assets/icons/notification.svg';
import Search from '@/shared/assets/icons/search.svg';

import { Button } from '@/shared/ui/button';
import { ButtonIcon } from '@/shared/ui/button-icon';
import { Input } from '@/shared/ui/input';
import { Logo } from '@/shared/ui/logo';
import { Text } from '@/shared/ui/text';
import { UserBar } from '@/widgets/login-bar';
import { SkillsCatalog } from '@/widgets/skills-catalog';

import styles from './header.module.scss';

export type THeaderProps = {
  userIsAuth: boolean;
  userData: TUser;
  searchQuery: () => void;
  categories: TCategories[];
};

export const Header = ({
  userIsAuth,
  userData,
  searchQuery,
  categories
}: THeaderProps) => {
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [userBarOpen, setUserBarOpen] = useState(false);
  const skillsRef = useRef<HTMLLIElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleSkills = () => setSkillsOpen((prev) => !prev);
  const toggleUserBar = () => setUserBarOpen((prev) => !prev);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (skillsRef.current && !skillsRef.current.contains(e.target as Node)) {
        setSkillsOpen(false);
      }

      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserBarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') toggleSkills();
    if (e.key === ' ') {
      e.preventDefault();
      toggleSkills();
    }
  };

  const handleUserKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') toggleSkills();
    if (e.key === ' ') {
      e.preventDefault();
      toggleUserBar();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to='/'>
          <Logo className={styles.headerLogo} />
        </Link>
        <nav className={styles.headerNavigation}>
          <ul className={styles.navigationList}>
            <li className={styles.navigationItem}>
              <Link
                to='/about'
                className={styles.navigationLink}
                aria-label='Перейти к информации о проекте'
              >
                О проекте
              </Link>
            </li>
            <li
              ref={skillsRef}
              tabIndex={0}
              role='button'
              aria-haspopup='true'
              aria-expanded={skillsOpen}
              className={`${styles.navigationItem} ${styles.navigationSkills}`}
              onClick={toggleSkills}
              onKeyDown={handleSkillKeyDown}
            >
              Все навыки
              <ArrowDown />
              <div
                className={`${styles.allSkills} ${skillsOpen ? styles.open : ''}`}
              >
                <SkillsCatalog categoriesList={categories} />
              </div>
            </li>
          </ul>
        </nav>
        <div className={styles.search}>
          {/*! ПОЛЕ ДЛЯ ПОИСКА */}
          <Input
            className={styles.inputWrapper}
            inputClassName={styles.searchInput}
            type='search'
            placeholder='Искать навык'
            onChange={searchQuery}
            icon={<Search />}
            iconStyleOverride={{ left: '12px' }}
            inputPadding={{ paddingLeft: '44px' }}
          />
        </div>
        <div className={styles.actionsBar}>
          <ButtonIcon
            aria-label='Переключить тему'
            onClick={() => {}}
            htmlType='button'
            icon={<Moon />}
          />
          {userIsAuth && (
            <>
              <ButtonIcon
                aria-label='Посмотреть уведомления'
                onClick={() => {}}
                htmlType='button'
                icon={<Bell />}
              />
              <ButtonIcon
                aria-label='Перейти в "Избранное"'
                onClick={() => navigate('/user/favorite')}
                htmlType='button'
                icon={<Heart />}
              />
            </>
          )}
        </div>
        <div className={styles.userBar}>
          {userIsAuth ? (
            <div
              className={styles.userData}
              ref={userRef}
              tabIndex={0}
              role='button'
              aria-haspopup='true'
              aria-expanded={userBarOpen}
              onClick={toggleUserBar}
              onKeyDown={handleUserKeyDown}
            >
              <Text
                textContent={userData.name}
                className={styles.userName}
                size='s'
                as='p'
              />
              <div className={styles.imageWrapper}>
                <img
                  src={userData.profileImage}
                  alt={`Фото пользователя ${userData.name}`}
                  className={styles.userPhoto}
                />
              </div>
              <div
                className={`${styles.userActionMenu} ${userBarOpen ? styles.open : ''}`}
              >
                <UserBar />
              </div>
            </div>
          ) : (
            <>
              <Button
                title='Войти'
                htmlType='button'
                variant='secondary'
                className={styles.loginButton}
                onClick={() => navigate('login')}
              />
              <Button
                title='Зарегистрироваться'
                htmlType='button'
                variant='primary'
                className={styles.loginButton}
                onClick={() => navigate('register')}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
