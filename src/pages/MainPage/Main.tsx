import { useSelector } from '@/app/store/store';
import { useNavigate } from 'react-router-dom';
import {
  getPopularCards,
  getNewCards,
  getCardsByCategory
} from '@/entities/skills/skills-slice';
import { Filter } from '@/features/filter-panel';

import ArrowRight from '@/shared/assets/icons/chevron-right.svg';
import Cross from '@/shared/assets/icons/cross.svg';
import Sort from '@/shared/assets/icons/sort.svg';

import { Button } from '@/shared/ui/button';
import { GallerySection } from '@/widgets/gallery-section';

import styles from './Main.module.scss';

export type TMainPageProps = {
  pageVariant: 'main' | 'filtered' | 'redirected';
};

export const MainPage = ({ pageVariant }: TMainPageProps) => {
  const newSkills = useSelector(getNewCards);
  const popularSkills = useSelector(getPopularCards);
  // передать аргументом номер категории, которую хотим показывать
  const categoryCards = useSelector(getCardsByCategory(1));
  const navigate = useNavigate();

  const handleFilter = () => {
    console.log('Фильтруем сначала новые');
  };

  const handleDeleteFilter = () => {
    console.log('Удаляем параметр из фильтров');
  };

  return (
    <div className={styles.contentWrapper}>
      <Filter />
      <div className={styles.gallery}>
        {pageVariant === 'main' && (
          <>
            <GallerySection
              skills={popularSkills}
              title='Популярное'
              maxCardsCount={3}
              hasAction
              buttonText='Смотреть все'
              onClick={() => navigate(`/related/popular`)}
              icon={<ArrowRight />}
              iconPosition='right'
            />
            <GallerySection
              skills={newSkills}
              title='Новое'
              maxCardsCount={3}
              hasAction
              buttonText='Смотреть все'
              onClick={() => navigate(`/related/new`)}
              icon={<ArrowRight />}
              iconPosition='right'
            />
            <GallerySection
              skills={categoryCards}
              title='Рекомендуем'
              maxCardsCount={9}
            />
          </>
        )}

        {pageVariant === 'filtered' && (
          <>
            <div className={styles.filterParams}>
              <Button
                title='Удалить'
                htmlType='button'
                onClick={handleDeleteFilter}
                variant='tertiary'
                className={styles.paramsButton}
                icon={<Cross />}
                iconPosition='right'
              />
              <Button
                title='Параметр'
                htmlType='button'
                onClick={handleDeleteFilter}
                variant='tertiary'
                className={styles.paramsButton}
                icon={<Cross />}
                iconPosition='right'
              />
              <Button
                title='Из фильтра'
                htmlType='button'
                onClick={handleDeleteFilter}
                variant='tertiary'
                className={styles.paramsButton}
                icon={<Cross />}
                iconPosition='right'
              />
            </div>
            <GallerySection
              skills={categoryCards}
              title='Подходящие предложения: '
              maxCardsCount={9}
              hasAction
              buttonText='Сначала новые'
              onClick={handleFilter}
              icon={<Sort />}
              iconPosition='left'
            />
          </>
        )}

        {pageVariant === 'redirected' && (
          <>
            <GallerySection
              skills={categoryCards}
              title='Вставить сюда название редиректа'
              maxCardsCount={9}
              hasAction
              buttonText='Сначала новые'
              onClick={handleFilter}
              icon={<Sort />}
              iconPosition='left'
            />
          </>
        )}
      </div>
    </div>
  );
};
