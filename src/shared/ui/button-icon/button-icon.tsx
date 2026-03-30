import styles from './button-icon.module.scss';
import type { TButtonIconProps } from './types';

export const ButtonIcon = ({
  onClick,
  htmlType,
  icon,
  className
}: TButtonIconProps) => (
  <button
    className={`${styles.button} ${className}`}
    type={htmlType}
    onClick={onClick}
  >
    {icon}
  </button>
);
