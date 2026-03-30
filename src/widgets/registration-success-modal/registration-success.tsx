import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import styles from './registration-success.module.scss';
import type { TRegistrationSuccessProps } from './types';
import Ok from '@/shared/assets/icons/ok.svg';

export const RegistrationSuccess = ({ onClose }: TRegistrationSuccessProps) => (
  <Modal onClose={onClose} mode='dialog' zIndex={10}>
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <Ok />
      </div>
      <div className={styles.text}>
        <Title
          as='p'
          size='m'
          className={styles.title}
          text='Ваше предложение создано'
        />
        <Text
          as='p'
          size='s'
          className={styles.descriptiion}
          textContent='Теперь вы можете предложить обмен'
        />
      </div>
      <Button
        className={styles.button}
        variant='primary'
        onClick={onClose}
        title='Готово'
        htmlType='button'
      />
    </div>
  </Modal>
);
