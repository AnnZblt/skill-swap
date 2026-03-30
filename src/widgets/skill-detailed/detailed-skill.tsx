import Edit from '@/shared/assets/icons/edit.svg';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

import styles from './detailed-skill.module.scss';
import type { TDetailedSkillProps } from './types';

export const DetailedSkill = ({
  name,
  category,
  subcategory,
  description,
  gallery,
  variant,
  onSubmit,
  onEdit,
  onClick,
  soloButtonText,
  soloButtonVariant,
  soloButtonIcon
}: TDetailedSkillProps) => (
  <div className={styles.skillWrapper}>
    <div className={styles.skillDescription}>
      <div className={styles.skillTitle}>
        <Title text={name} className={styles.title} size='xl' as='p' />
        <Text
          textContent={`${category} / ${subcategory}`}
          className={styles.subtitle}
          size='xs'
          as='p'
        />
      </div>
      <Text
        textContent={description}
        className={styles.description}
        size='s'
        as='span'
      />
      <div className={styles.buttonsWrapper}>
        {variant === 'preview' && (
          <>
            <Button
              title='Редактировать'
              htmlType='button'
              variant='secondary'
              onClick={onEdit}
              className={styles.button}
              icon={<Edit />}
              iconPosition='right'
            />
            <Button
              title='Готово'
              htmlType='button'
              variant='primary'
              onClick={onSubmit}
              className={styles.button}
            />
          </>
        )}
        {variant === 'fullview' && (
          <Button
            title={soloButtonText!}
            htmlType='button'
            variant={soloButtonVariant!}
            onClick={onClick}
            icon={soloButtonIcon}
            className={styles.button}
          />
        )}
      </div>
    </div>
    <div className={styles.skillImages}>
      {gallery.length > 0 && (
        <div className={styles.gallery}>
          {gallery.map((src, i) => {
            if (i === 0) {
              return (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className={styles.main}
                />
              );
            }

            if (i === 3) {
              const extraCount = gallery.length - 4;
              return extraCount > 0 ? (
                <div key={i} className={styles.overlay}>
                  <Text
                    size='s'
                    className={styles.extraImage}
                    as='p'
                    textContent={`+${extraCount}`}
                  />
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className={styles.thumb}
                  />
                </div>
              ) : (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className={styles.thumb}
                />
              );
            }

            if (i < 3) {
              return (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className={styles.thumb}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  </div>
);
