import styles from './title.module.scss';
import type { TitleProps } from './types';

export const Title = ({ size, text, className, as: Tag }: TitleProps) => (
  <Tag className={`${styles.title} ${styles[`title_${size}`]} ${className}`}>
    {text}
  </Tag>
);
