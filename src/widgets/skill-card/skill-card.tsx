import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import MoreActions from '@/shared/assets/icons/more-square.svg';
import Share from '@/shared/assets/icons/share.svg';
import { pickCategory } from '@/utils/pick-categories';
import { ButtonIcon } from '@/shared/ui/button-icon';
import { LikeButton } from '@/shared/ui/button-like';
import { Card } from '@/widgets/gallery-card';
import { DetailedSkill } from '@/widgets/skill-detailed';

import styles from './skill-card.module.scss';
import type { SkillCardProps } from './types';

export const SkillCard = ({
  skill,
  makeOffer,
  setLike,
  setShare
}: SkillCardProps) => {
  const categories = useSelector(categoriesList);
  const categoriesData = pickCategory(
    categories,
    skill?.canTeach.categoryId,
    skill?.canTeach.subcategoryId
  );

  return (
    <section className={styles.skillWrapper}>
      <div className={styles.skillOwner}>
        <Card data={skill} variant='detailed' />
      </div>
      <div className={styles.skillData}>
        <div className={styles.actionBar}>
          <LikeButton isLiked={skill.favorite.likeStatus} onClick={setLike} />
          <ButtonIcon icon={<Share />} htmlType='button' onClick={setShare!} />
          <ButtonIcon
            icon={<MoreActions />}
            htmlType='button'
            onClick={() => {}}
          />
        </div>
        <DetailedSkill
          name={skill.canTeach.skillName}
          category={categoriesData!.categoryTitle}
          subcategory={categoriesData!.subcategoryTitle}
          description={skill.description}
          gallery={skill.images}
          variant='fullview'
          onClick={makeOffer}
          soloButtonText='Предложить обмен'
          soloButtonVariant='primary'
        />
      </div>
    </section>
  );
};
