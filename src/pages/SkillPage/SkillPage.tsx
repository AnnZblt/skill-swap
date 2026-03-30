import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from '@/app/store/store';

import {
  skillsIsLoading,
  toggleLike,
  updateRequestStatus,
  getSkillById,
  getCardsByCategory
} from '@/entities/skills/skills-slice';

import { userState, userIsInit } from '@/entities/user/user-slice';
import { LoaderCircle } from '@/shared/ui/loader-circle';

import { GallerySection } from '@/widgets/gallery-section';
import { SkillCard } from '@/widgets/skill-card';
import styles from './SkillPage.module.scss';
import { NeedAuth } from '@/widgets/need-auth-modal';

export type TSkillPageProps = {};

export const SkillPage = () => {
  const { id } = useParams();
  const skillId = String(id);
  const skill = useSelector(getSkillById(skillId));
  const dispatch = useDispatch();
  const isAuth = useSelector(userIsInit);
  const currentUser = useSelector(userState);
  const skillLoading = useSelector(skillsIsLoading);
  const [showNeedAuth, setShowNeedAuth] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const recommendedSkills = useSelector(
    getCardsByCategory(skill!.canTeach.categoryId)
  );

  if (skillLoading || (!skill && !skillLoading)) {
    return (
      <div className={styles.preloaderWrapper}>
        <LoaderCircle />
        <p className={styles.preloaderTitle}>Загружаем навыки</p>
        <p className={styles.preloaderDescription}>
          Стараемся сделать все быстро, так быстро, что вы даже не успеете
          прочитать это предложение до конца
        </p>
      </div>
    );
  }

  if (!skill) {
    return <Navigate to='*' replace />;
  }

  const handleLike = () => {
    if (!isAuth) {
      console.log(currentUser);
      setShowNeedAuth(true);
      return;
    }
    dispatch(
      toggleLike({
        skillId: skillId!,
        userId: currentUser!.id
      })
    );
    console.log('toggle like');
  };

  const makeOffer = () => {
    if (!isAuth) {
      setShowNeedAuth(true);
      return;
    }
    dispatch(
      updateRequestStatus({
        skillId: skillId!,
        status: 'reqested',
        swapOwner: currentUser!.id
      })
    );
    console.log('swap requested: ', skill.swapOwner);
  };

  const handleShare = async (e?: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCoords({ x: e!.clientX, y: e!.clientY });
      setTimeout(() => setCoords(null), 600);
    } catch (err) {
      console.error('Не удалось скопировать ссылку: ', err);
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <SkillCard
        skill={skill}
        setLike={handleLike}
        setShare={handleShare}
        makeOffer={makeOffer}
      />
      <GallerySection
        skills={recommendedSkills}
        title='Похожие предложения'
        maxCardsCount={4}
      />
      {showNeedAuth && <NeedAuth onClose={() => setShowNeedAuth(false)} />}
      {coords && (
        <span
          style={{
            position: 'fixed',
            top: coords.y - 30,
            left: coords.x,
            background: 'white',
            color: '#69735D',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid #B2B9A9',
            fontSize: '12px',
            fontFamily: 'Arial'
          }}
        >
          Скопировано!
        </span>
      )}
    </div>
  );
};
