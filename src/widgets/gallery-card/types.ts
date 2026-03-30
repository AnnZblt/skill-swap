import type { TSkill } from '@/api/types';

type TCardVariant = 'compact' | 'detailed';

export type TCardProps = {
  data: TSkill;
  variant: TCardVariant;
  onButtonClick?: () => void;
  toggleLike?: () => void;
};
