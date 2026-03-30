import { useSelector } from '@/app/store/store';
import { getMyCards } from '@/entities/skills/skills-slice';
import { userState } from '@/entities/user/user-slice';

import LogoCircle from '@/shared/assets/icons/logo-circle.svg';
import { Text } from '@/shared/ui/text';
import { GallerySection } from '@/widgets/gallery-section';
import { ProfileSidebar } from '@/widgets/profile-menu-bar';
import styles from './UserSkillsPage.module.scss';

export const UserSkills = () => {
  const currentUser = useSelector(userState);
  const userSkills = useSelector(getMyCards(currentUser!.id));

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.menu}>
        <ProfileSidebar />
      </div>
      <div className={styles.gallery}>
        <GallerySection
          skills={userSkills}
          title='Список моих навыков для обмена'
          maxCardsCount={userSkills.length}
        />
        <section className={styles.newSection}>
          <div
            className={styles.newCard}
            onClick={() => {
              console.log('Тут будет диспатч санки для создания нового навыка');
            }}
            role='button'
          >
            <LogoCircle />
            <Text
              textContent='Добавить новый навык'
              as='p'
              size='s'
              className={styles.newCardText}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
