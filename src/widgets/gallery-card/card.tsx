import { useNavigate } from 'react-router-dom';
import Clock from '@/shared/assets/icons/clock.svg';
import Check from '@/shared/assets/icons/done.svg';
import { formatAge } from '@/utils/format-age';
import { Button } from '@/shared/ui/button';
import { LikeButton } from '@/shared/ui/button-like';
import { Tag } from '@/shared/ui/tag';
import { CompactTagsList } from '@/shared/ui/tag-compact';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

import styles from './card.module.scss';
import type { TCardProps } from './types';

export const Card = ({
  data,
  variant,
  onButtonClick,
  toggleLike
}: TCardProps) => {
  const navigate = useNavigate();
  return (
    <article className={styles.card}>
      <div className={styles.user}>
        <div className={styles.image}>
          <img
            alt={`Аватар пользователя ${data.skillOwner.name}`}
            src={data.skillOwner.profileImage}
            className={styles.imageContent}
          />
        </div>
        <div className={styles.info}>
          {variant === 'compact' && (
            <LikeButton
              isLiked={data.favorite.likeStatus}
              onClick={toggleLike!}
            />
          )}
          <div className={styles.details}>
            <Title
              size='l'
              text={data.skillOwner.name}
              className={styles.userName}
              as='p'
            />
            <Text
              size='xs'
              className={styles.userData}
              textContent={`${data.skillOwner.location}, ${formatAge(data.skillOwner.birthDate)}`}
              as='p'
            />
          </div>
        </div>
        {variant === 'detailed' && (
          <Text
            size='s'
            className={styles.userBio}
            textContent={data.skillOwner.bio}
            as='p'
          />
        )}
      </div>
      <div className={styles.skills}>
        <div className={styles.skill}>
          <Title
            size='s'
            text='Может научить'
            className={styles.userSkill}
            as='p'
          />
          <Tag id={data.canTeach.categoryId} title={data.canTeach.skillName} />
        </div>
        <div className={styles.skill}>
          <Title
            size='s'
            text='Хочет научиться'
            className={styles.userSkill}
            as='p'
          />
          {variant === 'compact' && (
            <CompactTagsList skills={data.wantToLearn} maxWidth={284} />
          )}
          {variant === 'detailed' && (
            <div className={styles.skillWrapper}>
              {data.wantToLearn.map((skill) => (
                <Tag
                  key={skill.subcategoryId}
                  id={skill.subcategoryId}
                  title={skill.title}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {variant === 'compact' && (
        <>
          {data.requestStatus === 'none' || data.requestStatus === 'decline' ? (
            <Button
              className={styles.cardBtn}
              htmlType='button'
              title='Подробнее'
              onClick={() => navigate(`/skills/${data.skillId}`)!}
              variant='primary'
            />
          ) : data.requestStatus === 'requested' ? (
            <Button
              className={styles.cardBtn}
              htmlType='button'
              icon={<Clock />}
              title='Обмен предложен'
              onClick={onButtonClick!}
              variant='secondary'
            />
          ) : data.requestStatus === 'approved' ? (
            <Button
              className={styles.cardBtn}
              htmlType='button'
              icon={<Check />}
              title='Обмен одобрен'
              onClick={onButtonClick!}
              variant='secondary'
            />
          ) : null}
        </>
      )}
    </article>
  );
};

/*
<div className={styles.skillWrapper}>
          {variant === 'compact' && (
            <SkillTagsCompact skills={data.wantToLearn} />
          )}
          {data.wantToLearn.map((skill) => (
            <Tag
              key={skill.subcategoryId}
              id={skill.subcategoryId}
              title={skill.title}
            />
          ))}
          {variant === 'detailed' && (
            <div className={styles.skillWrapper}>
              {data.wantToLearn.map(skill => (
                <Tag
                  key={skill.subcategoryId}
                  id={skill.subcategoryId}
                  title={skill.title}
                />
              ))}
            </div>
          )}
        </div>
        */
