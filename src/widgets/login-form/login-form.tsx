import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button/button';
import { InputEmail } from '@/shared/ui/input/input';
import { InputPassword } from '@/shared/ui/input-password';
import { Text } from '@/shared/ui/text';
import styles from './login-form.module.scss';
import type { LoginFormFields, LoginUIProps } from './types';

export const LoginFormUI = ({
  onSubmit,
  errorText,
  buttonText,
  buttonType = 'submit',
  onButtonClick
}: LoginUIProps) => {
  const { register, handleSubmit } = useForm<LoginFormFields>();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputEmail
        placeholder='Введите e-mail'
        label='E-mail'
        className={styles.input}
        inputClassName={errorText ? styles.inputError : ''}
        {...register('email')}
      />

      <InputPassword
        placeholder='Введите ваш пароль'
        label='Пароль'
        className={styles.input}
        inputClassName={errorText ? styles.inputError : ''}
        {...register('password')}
      />

      {errorText && (
        <Text
          as='p'
          textContent={errorText}
          size='s'
          className={styles.error}
        />
      )}

      <div className={styles.buttonContainer}>
        <Button
          variant='primary'
          title={buttonText}
          className={styles.button}
          htmlType={buttonType}
          onClick={buttonType === 'button' ? onButtonClick : undefined}
        />
      </div>
    </form>
  );
};
