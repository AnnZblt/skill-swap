import logoImg from '@/shared/assets/images/logo.svg?url';
import styles from './logo.module.scss';
import type { TLogoProps } from './types';

export const Logo = ({ className }: TLogoProps) => (
  <div className={`${styles.logo} ${className}`}>
    <img src={logoImg} alt='Skill-swap logo' />
  </div>
);
