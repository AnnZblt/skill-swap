import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { TSkill, TCompactSkill } from '@/api/types';
import { useSelector } from '@/app/store/store';

import { categoriesList } from '@/entities/categories/categories-slice';
import { getCardsBySubcategory } from '@/entities/skills/skills-slice';
import { Filter } from '@/features/filter-panel';

import Search from '@/shared/assets/icons/search.svg';
import Sort from '@/shared/assets/icons/sort.svg';
import UserImage from '@/shared/assets/icons/user-big.svg?url';
import { pickCategory } from '@/utils/pick-categories';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { GallerySection } from '@/widgets/gallery-section';

import styles from './SubcategoryPage.module.scss';

export const SubcategoryPage = () => {
  const { subcategoryId } = useParams();

  if (!subcategoryId) {
    return null; // !! добавить лоадер или скелетон
  }

  const id = Number(subcategoryId);

  if (Number.isNaN(id)) {
    return null;
  }

  const categoriesData = useSelector(categoriesList);
  const cards = useSelector(getCardsBySubcategory(id));
  const [sortedCards, setSortedCards] = useState<TCompactSkill[]>([]);
  const categoriesTitle = pickCategory(categoriesData, id.toString()[0], id);

  const handleFilter = () => {
    setSortedCards(
      [...cards].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    );
  };

  const displayedCards = sortedCards.length > 0 ? sortedCards : cards;

  return (
    <div className={styles.contentWrapper}>
      <Filter />
      <div className={styles.gallery}>
        {cards.length > 0 ? (
          <GallerySection
            skills={displayedCards}
            title={categoriesTitle!.subcategoryTitle}
            maxCardsCount={12}
            hasAction
            buttonText='Сначала новые'
            onClick={handleFilter}
            icon={<Sort />}
          />
        ) : (
          <>
            <Title
              text={categoriesTitle!.subcategoryTitle}
              className={styles.sectionTitle}
              size='xl'
              as='h3'
            />
            <div className={styles.emptyWrapper}>
              <div className={styles.emptyImage}>
                <img src={UserImage} alt='Изображение человека с лупой' />
                <div className={styles.iconWrapper}>
                  <Search />
                </div>
              </div>
              <Title
                text='Ничего не нашли в этой категории'
                as='p'
                size='l'
                className={styles.emptyTitle}
              />
              <Text
                textContent='Пусто, но временно — скоро здесь появятся первые предложения от пользователей'
                size='s'
                as='p'
                className={styles.emptyText}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
