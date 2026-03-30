import { useForm } from 'react-hook-form';
import { useDispatch } from '@/app/store/store';
import { checkEmailThunk } from '@/entities/user/user-slice';

import { Button } from '@/shared/ui/button/button';
import { InputEmail } from '@/shared/ui/input/input';
import { InputPassword } from '@/shared/ui/input-password';

import styles from './registration-email-form.module.scss';
import type {
  RegistrationEmailFormFields,
  RegistrationEmailUIProps
} from './types';

export const RegistrationEmailUI = ({
  onButtonClick,
  defaultValues
}: RegistrationEmailUIProps) => {
  const {
    register,
    getValues,
    formState: { errors, isValid }
  } = useForm<RegistrationEmailFormFields>({
    mode: 'onChange',
    defaultValues: defaultValues || { email: '', password: '' }
  });

  const dispatch = useDispatch();

  return (
    <form className={styles.form}>
      <InputEmail
        placeholder='Введите e-mail'
        label='Email'
        className={styles.input}
        error={errors.email?.message}
        {...register('email', {
          required: 'Введите e-mail',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Некорректный e-mail'
          },
          validate: async (value) => {
            const resultAction = await dispatch(
              checkEmailThunk({ email: value })
            );
            const taken = resultAction.payload as boolean;
            return taken ? 'Email уже используется' : true;
          }
        })}
      />

      <InputPassword
        placeholder='Придумайте надёжный пароль'
        label='Пароль'
        className={styles.input}
        error={errors.password?.message}
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 8,
            message: 'Пароль должен содержать не менее 8 знаков'
          },
          validate: (value) => {
            const hasUppercase = /[A-ZА-Я]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSymbol = /[^A-Za-zА-Яа-я0-9]/.test(value);

            if (!hasUppercase) return 'Добавьте хотя бы одну заглавную букву';
            if (!hasNumber) return 'Добавьте хотя бы одну цифру';
            if (!hasSymbol) return 'Добавьте хотя бы один символ';
            return true;
          }
        })}
      />

      <div className={styles.buttonContainer}>
        <Button
          variant='primary'
          title='Далее'
          className={styles.button}
          htmlType='button'
          disabled={!isValid}
          onClick={() => onButtonClick?.(getValues())}
        />
      </div>
    </form>
  );
};
