import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import { skillsState } from '@/entities/skills/skills-slice';

import { Title } from '@/shared/ui/title';
import { FilterCategory } from '@/widgets/filter-category';
import { FilterCity } from '@/widgets/filter-city';
import { FilterGender } from '@/widgets/filter-gender';
import { FilterType } from '@/widgets/filter-type';
import styles from './filter.module.scss';

export type TFilterProps = {};

export const Filter = () => {
  const skills = useSelector(skillsState);
  const categories = useSelector(categoriesList);
  const cityList: string[] = [];
  const categoryList: string[] = [];

  skills.map((skill) => cityList.push(skill.skillOwner.location));
  categories.map((category) => categoryList.push(category.title));

  return (
    <aside className={styles.filterPanel}>
      <Title size='l' text='Фильтры' className={styles.filterTitle} as='h2' />
      <div className={styles.filters}>
        <FilterType
          onTypeChange={() => {
            console.log('Фильтр типа поиска изменился');
          }}
        />
        <FilterCategory
          categories={categoryList}
          onCategoryChange={() => {
            console.log('Фильтр категории изменился');
          }}
        />
        <FilterGender
          onGenderChange={() => {
            console.log('Фильтр поиска по полу изменился');
          }}
        />
        <FilterCity
          cityList={cityList}
          onCityChange={() => {
            console.log('Фильтр поиска по городу изменился');
          }}
        />
      </div>
    </aside>
  );
};
