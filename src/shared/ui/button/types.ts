import type { ReactNode } from 'react';

export type TButtonProps = {
  title: string;
  onClick?: () => void;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
  variant: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'right' | 'left';
  disabled?: boolean;
};
