import { Radio } from '@/shared/ui/radio';
import { Title } from '@/shared/ui/title';
import styles from './filter-type.module.scss';
import type { TFilterTypeProps } from './types';

export const FilterType = ({ onTypeChange }: TFilterTypeProps) => (
  <div className={styles.filterWrapper}>
    <Title size='m' text='Что ищем' className={styles.filterTitle} as='h3' />
    <div className={styles.options}>
      <Radio
        value='all'
        title='Всё'
        groupName='mode'
        checked={true}
        onChange={onTypeChange}
      />
      <Radio
        value='wantToLean'
        title='Хочу научиться'
        groupName='mode'
        checked={false}
        onChange={onTypeChange}
      />
      <Radio
        value='canTeach'
        title='Могу научить'
        groupName='mode'
        checked={false}
        onChange={onTypeChange}
      />
    </div>
  </div>
);
