import type { ReactNode } from 'react';

export type TModalUIProps = {
  title?: string;
  description?: string;
  onClose: () => void;
  mode: 'dialog' | 'fullscreen'; // фулскрил или диалоговое окно
  zIndex: number; // для отображения модалок поверх модалок
  children?: ReactNode;
};
