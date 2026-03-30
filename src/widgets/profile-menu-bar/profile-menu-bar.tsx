import { NavLink, useLocation } from 'react-router-dom';

import Lightbulb from '@/shared/assets/icons/idea.svg';
import Favorite from '@/shared/assets/icons/like.svg';
import ChatBubble from '@/shared/assets/icons/message-text.svg';
import Mail from '@/shared/assets/icons/request.svg';
import User from '@/shared/assets/icons/user.svg';

import { Text } from '@/shared/ui/text';

import styles from './profile-menu-bar.module.scss';

const menuItems = [
  {
    to: '/user/requests',
    text: 'Заявки',
    icon: <Mail />
  },
  {
    to: '/user/swaps',
    text: 'Мои обмены',
    icon: <ChatBubble />
  },
  {
    to: '/user/favorite',
    text: 'Избранное',
    icon: <Favorite />
  },
  {
    to: '/user/skills',
    text: 'Мои навыки',
    icon: <Lightbulb />
  },
  {
    to: '/user/profile',
    text: 'Личные данные',
    icon: <User />,
    end: true
  }
];

export const ProfileSidebar = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `${styles.sidebarItem} ${isActive || location.pathname === item.to ? styles.active : ''}`
          }
        >
          {item.icon}
          <Text
            textContent={item.text}
            size='s'
            as='span'
            className={styles.sidebarText}
          />
        </NavLink>
      ))}
    </aside>
  );
};
