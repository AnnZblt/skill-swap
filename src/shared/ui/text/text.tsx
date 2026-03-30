import styles from './text.module.scss';
import type { TTextProps } from './types';

export const Text = ({ size, className, textContent, as: Tag }: TTextProps) => (
  <Tag className={`${styles.text} ${styles[`text_${size}`]} ${className}`}>
    {textContent}
  </Tag>
);
