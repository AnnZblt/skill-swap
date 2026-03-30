import { Link } from 'react-router-dom';

import Education from '@/shared/assets/icons/book.svg?url';
import Business from '@/shared/assets/icons/briefcase.svg?url';
import Languages from '@/shared/assets/icons/global.svg?url';
import Home from '@/shared/assets/icons/home.svg?url';
import Lifestyle from '@/shared/assets/icons/lifestyle.svg?url';
import Art from '@/shared/assets/icons/palette.svg?url';

import { Title } from '@/shared/ui/title';

import styles from './skills-catalog.module.scss';
import type { TSkillCatalogProps } from './types';

export const SkillsCatalog = ({
  className,
  categoriesList
}: TSkillCatalogProps) => {
  const categoryIcons: Record<number, string> = {
    1: Business,
    2: Languages,
    3: Home,
    4: Art,
    5: Education,
    6: Lifestyle
  };
  const categoryToken: Record<number, string> = {
    1: 'business',
    2: 'languages',
    3: 'home',
    4: 'art',
    5: 'education',
    6: 'lifestyle'
  };

  return (
    <div className={`${styles.catalogWrapper} ${className}`}>
      {categoriesList.map((category) => (
        <div key={category.categoryId} className={styles.categoryWrapper}>
          <div className={styles.categoryItem}>
            <div className={styles.categoryImage}>
              <img
                src={categoryIcons[category.categoryId]}
                alt={category.title}
                data-category={categoryToken[category.categoryId]}
                className={styles.categoryIcon}
              />
            </div>
            <div className={styles.subcategoriesList}>
              <Title
                size='l'
                className={styles.categoryTitle}
                text={category.title}
                as='span'
              />
              <ul className={styles.list}>
                {category.subcategories.map((subcategory) => (
                  <li
                    key={subcategory.subcategoryId}
                    className={styles.subcategoryItem}
                  >
                    <Link to={`/${subcategory.subcategoryId}`}>
                      {subcategory.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
