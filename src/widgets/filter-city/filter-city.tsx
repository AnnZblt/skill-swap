import { Checkbox } from '@/shared/ui/checkbox';
import { Title } from '@/shared/ui/title';
import styles from './filter-city.module.scss';
import type { TFilterCityProps } from './types';

export const FilterCity = ({ cityList, onCityChange }: TFilterCityProps) => (
  <div className={styles.filterWrapper}>
    <Title size='m' text='Город' className={styles.filterTitle} as='h3' />
    <div className={styles.options}>
      {cityList.map((city, index: number) => (
        <Checkbox
          key={index}
          label={city}
          name='location'
          value={city}
          checked={false}
          onChange={onCityChange}
          variant='tick'
        />
      ))}
    </div>
  </div>
);
