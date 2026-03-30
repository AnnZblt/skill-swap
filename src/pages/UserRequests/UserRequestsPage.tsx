import { useSelector } from '@/app/store/store';
import { getRequestedCards } from '@/entities/skills/skills-slice';
import { userState } from '@/entities/user/user-slice';

import Clock from '@/shared/assets/icons/clock.svg';
import UserImage from '@/shared/assets/icons/user-big.svg?url';

import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { GallerySection } from '@/widgets/gallery-section';
import { ProfileSidebar } from '@/widgets/profile-menu-bar';
import styles from './UserRequestsPage.module.scss';

export const UserRequests = () => {
  const currentUser = useSelector(userState);
  const requestedSkills = useSelector(getRequestedCards(currentUser!.id));

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.menu}>
        <ProfileSidebar />
      </div>
      <div className={styles.gallery}>
        {requestedSkills.length > 0 ? (
          <GallerySection
            skills={requestedSkills}
            title='Заявки для обмена навыками'
            maxCardsCount={requestedSkills.length}
          />
        ) : (
          <div className={styles.emptyWrapper}>
            <div className={styles.emptyImage}>
              <img src={UserImage} alt='Изображение человека с часами' />
              <div className={styles.iconWrapper}>
                <Clock />
              </div>
            </div>
            <Title
              text='Здесь пока пусто'
              as='p'
              size='l'
              className={styles.emptyTitle}
            />
            <Text
              textContent='Начните создавать свою сеть обменов — отправьте первое предложение!'
              size='s'
              as='p'
              className={styles.emptyText}
            />
          </div>
        )}
      </div>
    </div>
  );
};
