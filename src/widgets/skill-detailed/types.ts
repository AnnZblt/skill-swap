export type TDetailedSkillProps = {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  gallery: string[];
  variant: 'preview' | 'fullview';
  onSubmit?: () => void;
  onEdit?: () => void;
  onClick?: () => void;
  soloButtonText?: string;
  soloButtonVariant?: 'primary' | 'secondary' | 'tertiary';
  soloButtonIcon?: React.ReactNode;
};
