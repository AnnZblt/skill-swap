import { Text } from '@/shared/ui/text';
import { getBadgeColor } from './get-tag-color';
import styles from './tag.module.scss';
import type { TTagProps } from './types';

export const Tag = ({ id, title, overflowEllipsis }: TTagProps) => {
  const color = getBadgeColor(id);
  return (
    <div
      className={styles.tag}
      style={{ backgroundColor: color }}
      data-ellipsis={overflowEllipsis}
    >
      <Text size='xs' className={styles.text} textContent={title} as='p' />
    </div>
  );
};
