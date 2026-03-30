import { useSelector } from '@/app/store/store';
import { getApprovedCards } from '@/entities/skills/skills-slice';
import { userState } from '@/entities/user/user-slice';

import Update from '@/shared/assets/icons/sort.svg';
import UserImage from '@/shared/assets/icons/user-big.svg?url';

import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { GallerySection } from '@/widgets/gallery-section';
import { ProfileSidebar } from '@/widgets/profile-menu-bar';
import styles from './UserSwapsPage.module.scss';

export const UserSwaps = () => {
  const currentUser = useSelector(userState);
  const approvedSkills = useSelector(getApprovedCards(currentUser!.id));

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.menu}>
        <ProfileSidebar />
      </div>
      <div className={styles.gallery}>
        {approvedSkills.length > 0 ? (
          <GallerySection
            skills={approvedSkills}
            title='Список одобренных обменов'
            maxCardsCount={approvedSkills.length}
          />
        ) : (
          <div className={styles.emptyWrapper}>
            <div className={styles.emptyImage}>
              <img src={UserImage} alt='Изображение человека' />
              <div className={styles.iconWrapper}>
                <Update />
              </div>
            </div>
            <Title
              text='Здесь пока пусто'
              as='p'
              size='l'
              className={styles.emptyTitle}
            />
            <Text
              textContent={
                'Ваши успешные обмены собраны в этом разделе.\nХотите больше возможностей? Создайте навык, который оценят другие!'
              }
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
