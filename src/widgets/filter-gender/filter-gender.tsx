import { Radio } from '@/shared/ui/radio';
import { Title } from '@/shared/ui/title';
import styles from './filter-gender.module.scss';
import type { TFilterGenderProps } from './types';

export const FilterGender = ({ onGenderChange }: TFilterGenderProps) => (
  <div className={styles.filterWrapper}>
    <Title size='m' text='Пол автора' className={styles.filterTitle} as='h3' />
    <div className={styles.options}>
      <Radio
        value='none'
        title='Не имеет значения'
        groupName='gerder'
        checked={true}
        onChange={onGenderChange}
      />
      <Radio
        value='male'
        title='Мужской'
        groupName='gerder'
        checked={false}
        onChange={onGenderChange}
      />
      <Radio
        value='female'
        title='Женский'
        groupName='gerder'
        checked={false}
        onChange={onGenderChange}
      />
    </div>
  </div>
);
