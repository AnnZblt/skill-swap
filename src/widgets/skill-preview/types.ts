import type { SkillFormFields } from '@/widgets/registration-skill-form/types';

export type SkillPreviewProps = {
  formData: SkillFormFields;
  onClose: () => void;
  onEdit: () => void;
  onConfirm: () => void;
};
