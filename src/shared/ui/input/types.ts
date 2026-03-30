import type { ChangeEvent, MouseEventHandler } from 'react';

export interface IInputProps {
  className?: string;
  inputClassName?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?:
    | MouseEventHandler<HTMLInputElement>
    | ((e?: React.MouseEvent | React.KeyboardEvent) => void);
  error?: string;
  icon?: React.ReactNode;
  iconStyleOverride?: React.CSSProperties;
  inputPadding?: React.CSSProperties;
}
