import { useState } from 'react';
import EyeOffIcon from '@/shared/assets/icons/eye-slash.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ButtonIcon } from '@/shared/ui/button-icon';
import { Input } from '@/shared/ui/input/input';
import styles from './input-password.module.scss';
import type { PasswordInputProps } from './types';

export const InputPassword = ({
  value,
  name,
  onChange,
  placeholder,
  label,
  error,
  className,
  inputClassName,
  ...props
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        error={error}
        inputClassName={inputClassName}
        type={isVisible ? 'text' : 'password'}
        {...props}
      />
      <ButtonIcon
        onClick={() => setIsVisible((prev) => !prev)}
        htmlType='button'
        icon={isVisible ? <EyeOffIcon /> : <EyeIcon />}
        aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
        className={styles.toggleBtn}
      />
    </div>
  );
};
