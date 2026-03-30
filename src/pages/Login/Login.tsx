import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { LoginFeature } from '@/features/login';
import Cross from '@/shared/assets/icons/cross.svg';
import loginImg from '@/shared/assets/images/light-bulb.svg?url';
import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { QAuthBar } from '@/widgets/qauth-login-bar/qauth-login-bar';
import { RegistrationUI } from '@/widgets/registration-ui';

import styles from './login.module.scss';

export const Login = () => {
  // хук для редиректа
  // тут же используем useLocation, если надо вернуться на определенную страницу
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <Logo className={styles.headerLogo} />
        <Button
          variant='tertiary'
          title='Закрыть'
          className={styles.headerButton}
          htmlType='button'
          icon={<Cross />}
          iconPosition='right'
          onClick={() => navigate(-1)}
        />
      </div>

      <div className={styles.statusbar}>
        <Title as='h3' text='Вход' size='l' className={styles.heading} />
      </div>

      <RegistrationUI
        imageSrc={loginImg}
        title='С возвращением в SkillSwap!'
        description='Обменивайтесь знаниями и навыками с другими людьми'
      >
        <div className={styles.wrapper}>
          <QAuthBar />
          <div className={styles.separator}>
            <Text as='p' textContent='или' size='s' className={styles.text} />
          </div>
          <LoginFeature onSuccess={() => navigate(-1)} />
        </div>
        <div className={styles.registration}>
          <Link to='/register' className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </RegistrationUI>
    </>
  );
};
