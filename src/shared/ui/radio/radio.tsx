import type { FC } from 'react';
import { Text } from '../text';
import styles from './radio.module.scss';
import type { TRadioProps } from './types';

export const Radio: FC<TRadioProps> = ({
  value,
  title,
  groupName,
  checked,
  onChange
}: TRadioProps) => (
  <>
    <label className={styles.inputWrapper}>
      <input
        className={styles.input}
        type='radio'
        name={groupName}
        value={value}
        checked={checked}
        onChange={onChange}
        tabIndex={-1}
      />
      <Text size='s' className={styles.label} textContent={title} as='p' />
    </label>
  </>
);

/*
Перенести в бизнес логику
onChange:
const handleChange = () => onChange(value)
*/
