import styles from './checkbox.module.scss';
import type { CheckboxProps } from './types';

export const Checkbox = ({
  label,
  name,
  value,
  checked,
  onChange,
  variant = 'tick'
}: CheckboxProps) => (
  <div className={styles.checkbox}>
    <label className={styles.checkboxLabel}>
      <input
        className={styles.checkboxInput}
        type='checkbox'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        data-variant={variant}
      />
      <span className={styles.checkmark} />
      {label}
    </label>
  </div>
);
