import LikeFill from '@/shared/assets/icons/like-fill.svg';
import LikeEmpty from '@/shared/assets/icons/like.svg';
import styles from './like-button.module.scss';
import type { TLikeButtonProps } from './types';

export const LikeButton = ({ isLiked, onClick }: TLikeButtonProps) => (
  <button onClick={onClick} className={styles.like}>
    {isLiked ? <LikeFill /> : <LikeEmpty />}
  </button>
);
