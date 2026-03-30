import type { ElementType } from 'react';

export type TitleProps = {
  size: 'xl' | 'l' | 'm' | 's';
  className: string;
  text: string;
  as: ElementType;
};
