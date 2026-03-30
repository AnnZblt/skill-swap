import { useSelector } from '@/app/store/store';
import { getFavoriteCards } from '@/entities/skills/skills-slice';
import { userState } from '@/entities/user/user-slice';

import Heart from '@/shared/assets/icons/like.svg';
import UserImage from '@/shared/assets/icons/user-big.svg?url';

import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { GallerySection } from '@/widgets/gallery-section';
import { ProfileSidebar } from '@/widgets/profile-menu-bar';
import styles from './UserFavoritePage.module.scss';

export const UserFavorite = () => {
  const currentUser = useSelector(userState);
  const favoriteSkills = useSelector(getFavoriteCards(currentUser!.id));

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.menu}>
        <ProfileSidebar />
      </div>
      <div className={styles.gallery}>
        {favoriteSkills.length > 0 ? (
          <GallerySection
            skills={favoriteSkills}
            title='Навыки, которые вам понравились'
            maxCardsCount={favoriteSkills.length}
          />
        ) : (
          <div className={styles.emptyWrapper}>
            <div className={styles.emptyImage}>
              <img src={UserImage} alt='Изображение человека с сердечком' />
              <div className={styles.iconWrapper}>
                <Heart />
              </div>
            </div>
            <Title
              text='Здесь пока пусто'
              as='p'
              size='l'
              className={styles.emptyTitle}
            />
            <Text
              textContent='В этом разделе будут собраны все навыки, которые вы отметили как интересные для себя'
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
