import { Checkbox } from '@/shared/ui/checkbox';
import { Title } from '@/shared/ui/title';
import styles from './filter-category.module.scss';
import type { TFilterCategoryProps } from './types';

export const FilterCategory = ({
  categories,
  onCategoryChange
}: TFilterCategoryProps) => (
  <div className={styles.filterWrapper}>
    <Title size='m' text='Навыки' className={styles.filterTitle} as='h3' />
    <div className={styles.options}>
      {categories.map((cagetory, index: number) => (
        <Checkbox
          key={index}
          label={cagetory}
          name='cagetory'
          value={cagetory}
          checked={false}
          onChange={onCategoryChange}
          variant='minus'
        />
      ))}
    </div>
  </div>
);
