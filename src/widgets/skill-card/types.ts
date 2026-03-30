import type { TSkill } from '@/api/types';

export type SkillCardProps = {
  skill: TSkill;
  makeOffer: () => void;
  setLike: () => void;
  setShare: (e?: React.MouseEvent) => void;
};
