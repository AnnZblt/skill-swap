export interface CheckboxProps {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'tick' | 'minus';
}
