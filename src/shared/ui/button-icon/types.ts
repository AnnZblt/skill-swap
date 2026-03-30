import type { ReactElement } from 'react';

export type TButtonIconProps = {
  onClick: () => void;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
  icon: ReactElement;
  className?: string;
};
