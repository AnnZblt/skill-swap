export type RegistrationEmailFormFields = {
  email: string;
  password: string;
};

export type RegistrationEmailUIProps = {
  onButtonClick?: (values: RegistrationEmailFormFields) => void;
  defaultValues?: RegistrationEmailFormFields;
};
