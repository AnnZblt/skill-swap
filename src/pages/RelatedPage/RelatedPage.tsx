import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { TSkill, TCompactSkill } from '@/api/types';
import { useSelector } from '@/app/store/store';
import {
  getPopularCards,
  getNewCards,
  getCardsByCategory
} from '@/entities/skills/skills-slice';

import { categoriesList } from '@/entities/categories/categories-slice';
import { Filter } from '@/features/filter-panel';

import Sort from '@/shared/assets/icons/sort.svg';
import { GallerySection } from '@/widgets/gallery-section';

import styles from './RelatedPage.module.scss';

export const RelatedPage = () => {
  const { pathName } = useParams();
  const categoriesData = useSelector(categoriesList);
  console.log(categoriesData.length);

  if (!pathName) {
    return null; // !! добавить лоадер или скелетон
  }
  /*
  перенести в тернарный оператор для отрисовки компонента
  if (Number(pathName) > categoriesData.length || Number(pathName) === 0) {
    return <Navigate to='*' replace />;
  }
  */

  const getRelatedName = (relatedName: string) => {
    let title: string = '';
    if (!isNaN(Number(relatedName))) {
      const categoryTitle = categoriesData.find((c) => c.categoryId === Number(relatedName))?.title;
      return title = categoryTitle ? categoryTitle : 'Категория';
    } else if (relatedName === 'popular') {
      return title = 'Популярное';
    } else {
      return title = 'Новое';
    }
  }

  const getRelatedCards = (name: string) => {
    let cards = [];
    if (!isNaN(Number(name))) {
      return cards = useSelector(getCardsByCategory(Number(name)));
    } else if (name === 'popular') {
      return cards = useSelector(getPopularCards);
    } else {
      return cards = useSelector(getNewCards);
    }
  }

  const pageTitle = getRelatedName(pathName)
  const cards = getRelatedCards(pathName);
  console.log(categoriesData.length);
  //const [sortedCards, setSortedCards] = useState<TCompactSkill[]>([]);

  /*
  const handleFilter = () => {
    setSortedCards(
      [...cards].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    );
  };

  const displayedCards = sortedCards.length > 0 ? sortedCards : cards;
  */

  return (
    <div className={styles.contentWrapper}>
      <Filter />
      <div className={styles.gallery}>
        <GallerySection
          skills={cards}
          title={pageTitle}
          maxCardsCount={cards.length}
          hasAction
          buttonText='Сначала новые'
          onClick={() => console.log('Сортируем по дате')}
          icon={<Sort />}
          iconPosition='left'
        />
      </div>
    </div>
  );
};
