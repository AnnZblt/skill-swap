import { useDispatch } from '@/app/store/store';

import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { Title } from '@/shared/ui/title';
import { Card } from '@/widgets/gallery-card';

import styles from './gallery-section.module.scss';
import type { TGallerySectionProps } from './types';

export const GallerySection = ({
  skills,
  title,
  maxCardsCount,
  hasAction,
  buttonText,
  icon,
  iconPosition,
  onClick
}: TGallerySectionProps) => {
  const dispatch = useDispatch();
  return (
    <section className={styles.gallerySection}>
      <div className={styles.sectionHeader}>
        <Title text={title} className={styles.sectionTitle} size='xl' as='h3' />
        {hasAction && ( // если hasAction true, то опциональные параметры точно есть
          <Button
            title={buttonText!}
            icon={icon}
            iconPosition={iconPosition}
            onClick={onClick!}
            htmlType='button'
            variant='tertiary'
            className={styles.sectionButton}
          />
        )}
      </div>
      {skills.length > 0 ? (
        <div className={styles.galleryContent}>
          {skills.slice(0, maxCardsCount).map((skill) => (
            <Card
              key={skill.skillId}
              data={{ ...skill, description: '', images: [] }}
              variant='compact'
              onButtonClick={() => {
                // console.log('Open fullview skill');
              }}
              toggleLike={() => {
                console.log('Toggle like');
              }}
            />
          ))}
        </div>
      ) : (
        <Skeleton />
      )}
    </section>
  )
};
