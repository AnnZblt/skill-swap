import type { RegistrationEmailFormFields } from '@/widgets/registration-email-form/types';
import type { SkillFormFields } from '@/widgets/registration-skill-form/types';
import type { UserFormFields } from '@/widgets/registration-user-form/types';

export type RegistrationUserProps = {
  onNextClick: (values: UserFormFields) => void;
  onPrevClick: () => void;
  defaultValues?: UserFormFields;
};

export type RegistrationSkillProps = {
  onNextClick: (values: SkillFormFields) => void;
  onPrevClick: () => void;
  defaultValues?: SkillFormFields;
};

export type RegistrationEmailProps = {
  onNextClick: (values: RegistrationEmailFormFields) => void;
  defaultValues?: RegistrationEmailFormFields;
};
