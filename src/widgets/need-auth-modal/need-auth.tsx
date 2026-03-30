import UserProfile from '@/shared/assets/icons/user-big.svg';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

import styles from './need-auth.module.scss';
import type { NeedAuthProps } from './types';

export const NeedAuth = ({ onClose }: NeedAuthProps) => (
  <Modal onClose={onClose} mode='dialog' zIndex={10}>
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <UserProfile />
      </div>
      <div className={styles.text}>
        <Title
          size='xl'
          as='p'
          className={styles.title}
          text='Пожалуйста, войдите в аккаунт'
        />
        <Text
          size='s'
          as='p'
          className={styles.descriptiion}
          textContent='Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
        />
      </div>
      <Button
        className={styles.button}
        variant='primary'
        onClick={onClose}
        title='Войти'
        htmlType='button'
      />
    </div>
  </Modal>
);
