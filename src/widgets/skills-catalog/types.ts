import type { TCategories } from '@/api/types';

export type TSkillCatalogProps = {
  className?: string; // для управления видимостью
  categoriesList: TCategories[];
};
