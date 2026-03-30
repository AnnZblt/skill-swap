import type { ReactNode } from 'react';
import type { TCompactSkill } from '@/api/types';

export type TGallerySectionProps = {
  skills: TCompactSkill[];
  title: string;
  maxCardsCount: number;
  hasAction?: boolean;
  buttonText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
};
