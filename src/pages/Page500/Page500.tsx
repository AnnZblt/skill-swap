import { useNavigate } from 'react-router-dom';

import image500 from '@/shared/assets/images/error-500.svg?url';

import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import styles from './Page500.module.scss';

export const PageError500 = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  const handleReportError = () => {
    console.log('Сообщение об ошибке отправлено');
  };

  return (
    <section className={styles.errorPage}>
      <div className={styles.container}>
        <img className={styles.image} src={image500} alt='Ошибка 500' />
        <div className={styles.textContent}>
          <Title
            size='m'
            text='На сервере произошла ошибка'
            className={styles.pageTitle}
            as='h3'
          />
          <Text
            size='s'
            className={styles.pageText}
            textContent='Попробуйте позже или вернитесь на главную страницу'
            as='p'
          />
        </div>
        <div className={styles.buttonList}>
          <Button
            title='Сообщить об ошибке'
            onClick={handleReportError}
            htmlType='button'
            variant='secondary'
            className={`${styles.buttonError} ${styles.button}`}
          />
          <Button
            title='На главную'
            onClick={handleGoToMain}
            htmlType='button'
            variant='primary'
            className={`${styles.buttonEscape} ${styles.button}`}
          />
        </div>
      </div>
    </section>
  );
};
