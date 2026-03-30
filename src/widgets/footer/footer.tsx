import { Link } from 'react-router-dom';
import { Logo } from '@/shared/ui/logo';
import { Text } from '@/shared/ui/text';

import styles from './footer.module.scss';

export type TFooterProps = {};

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <Logo className={styles.footerLogo} />
      <nav className={styles.footerNavigation}>
        <ul className={`${styles.navigationList} ${styles.listWithBullits}`}>
          <li className={styles.navigationItem}>
            <Link
              to='/about'
              className={styles.navigationLink}
              aria-label='Перейти к информации о проекте'
            >
              О проекте
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link
              to='/skills'
              className={styles.navigationLink}
              aria-label='Перейти ко всем навыкам'
            >
              Все навыки
            </Link>
          </li>
        </ul>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <Link
              to='/contacts'
              className={styles.navigationLink}
              aria-label='Перейти к контактам'
            >
              Контакты
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link
              to='/blog'
              className={styles.navigationLink}
              aria-label='Перейти к блогу'
            >
              Блог
            </Link>
          </li>
        </ul>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <Link
              to='/privacy-policy'
              className={styles.navigationLink}
              aria-label='Перейти к политике конфиденциальности'
            >
              Политика конфиденциальности
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link
              to='/agreement'
              className={styles.navigationLink}
              aria-label='Перейти к пользовательскому соглашению'
            >
              Пользовательское соглашение
            </Link>
          </li>
        </ul>
      </nav>
      <Text
        className={styles.copyright}
        textContent='SkillSwap — 2026'
        size='xs'
        as='p'
      />
    </div>
  </footer>
);
