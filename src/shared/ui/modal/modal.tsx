import { memo, useEffect } from 'react';
import { Title } from '../title';

import styles from './modal.module.scss';
import type { TModalUIProps } from './types';

export const Modal = memo(
  ({
    title,
    description,
    onClose,
    mode,
    zIndex = 10,
    children
  }: TModalUIProps) => {
    useEffect(() => {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    return (
      <div
        role='button'
        tabIndex={0}
        className={styles.overlay}
        style={{ zIndex: zIndex - 1 }}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
      >
        <div
          role='presentation'
          className={`${styles.modal} ${styles[`modal_${mode}`]}`}
          style={{ zIndex }}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || description) && (
            <div className={styles.header}>
              {title && (
                <Title as='h3' size='l' text={title} className={styles.title} />
              )}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'ModalUI';
