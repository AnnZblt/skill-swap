import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from '@/app/store/store';
import { userState } from '@/entities/user/user-slice';

import EditImage from '@/shared/assets/icons/gallery-edit.svg';
import { cityOptions } from '@/shared/lib/constants/city-options';
import { Button } from '@/shared/ui/button';
import { Dropdown } from '@/shared/ui/dropdown';
import { Input } from '@/shared/ui/input';
import { InputPassword } from '@/shared/ui/input-password';
import { Textarea } from '@/shared/ui/textarea';
import { ProfileSidebar } from '@/widgets/profile-menu-bar';
import styles from './user-cabinet.module.scss';
import { DatePicker } from '@/shared/ui/date-picker';

export type TUserCabinetProps = {
  defaultValues?: UserFormFields;
};

export type UserFormFields = {
  email: string;
  password: string;
  profileImage: string;
  name: string;
  birthDate: string;
  gender: string;
  location: string;
  bio: string;
};

export const UserCabinet = ({ defaultValues }: TUserCabinetProps) => {
  const currentUser = useSelector(userState);
  const form = useForm<UserFormFields>({
    mode: 'onChange',
    defaultValues: defaultValues || {
      email: currentUser?.email ?? '',
      password: '',
      profileImage: currentUser?.profileImage ?? '',
      name: currentUser?.name ?? '',
      birthDate: currentUser?.birthDate ?? '',
      gender: currentUser?.gender ?? '',
      location: currentUser?.location ?? '',
      bio: currentUser?.bio ?? ''
    }
  });

  const {
    register: editProfile,
    handleSubmit,
    control,
    watch,
    formState
  } = form;
  const { errors, isDirty } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const currentImage = watch('profileImage');

  const [preview, setPreview] = useState<string | null>(
    typeof currentImage === 'string' ? currentImage : null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: UserFormFields) => {
    console.log('RESULT:', data);
  };

  return (
    <>
      <div className={styles.menu}>
        <ProfileSidebar />
      </div>
      <div className={styles.profile}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.imageWrapper}>
            <input
              id='avatar'
              placeholder='Добавьте вашу фотографию'
              type='file'
              accept='image/*'
              className={styles.inputAvatar}
              onChange={handleImageUpload}
            />
            <label htmlFor='avatar' className={styles.labelAvatar}>
              <div className={styles.iconWrapper}>
                <EditImage />
              </div>
              <div className={styles.circle}>
                {preview ? (
                  <img
                    src={preview}
                    alt='User profile preview'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <img
                    src={defaultValues!.profileImage}
                    alt='User profile preview'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                )}
              </div>
            </label>
          </div>
          <div className={styles.fieldsWrapper}>
            <div className={styles.loginData}>
              <Input
                placeholder='Введите вашу почту'
                label='Почта'
                type='text'
                className={styles.inputEmail}
                inputClassName=''
                {...editProfile('email', { required: true })}
              />

              {!showPassword && (
                <Button
                  title='Изменить пароль'
                  variant='tertiary'
                  onClick={() => setShowPassword(true)}
                  htmlType='button'
                  className={styles.showPasswordBtn}
                />
              )}

              {showPassword && (
                <InputPassword
                  placeholder='Придумайте надёжный пароль'
                  label='Пароль'
                  className={styles.inputPassword}
                  error={errors.password?.message}
                  {...editProfile('password', {
                    required: 'Введите пароль',
                    minLength: {
                      value: 8,
                      message: 'Пароль должен содержать не менее 8 знаков'
                    },
                    validate: (value: string) => {
                      const hasUppercase = /[A-ZА-Я]/.test(value);
                      const hasNumber = /\d/.test(value);
                      const hasSymbol = /[^A-Za-zА-Яа-я0-9]/.test(value);

                      if (!hasUppercase)
                        return 'Добавьте хотя бы одну заглавную букву';
                      if (!hasNumber) return 'Добавьте хотя бы одну цифру';
                      if (!hasSymbol) return 'Добавьте хотя бы один символ';
                      return true;
                    }
                  })}
                />
              )}
            </div>

            <Input
              placeholder='Введите ваше имя'
              label='Имя'
              type='text'
              className={styles.inputName}
              inputClassName=''
              {...editProfile('name', { required: true })}
            />

            <div className={styles.row}>
              <Controller
                control={control}
                name='birthDate'
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={(date: string | undefined) =>
                      field.onChange(date)
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name='gender'
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    options={[
                      { label: 'Мужской', value: 'male' },
                      { label: 'Женский', value: 'female' }
                    ]}
                    title='Пол'
                    placeholder='Не указан'
                    type='select'
                    value={field.value}
                    onChange={field.onChange}
                    className={styles.selectGender}
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name='location'
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  options={cityOptions}
                  title='Город'
                  placeholder='Не указан'
                  type='searchable'
                  value={field.value}
                  onChange={field.onChange}
                  className={styles.select}
                />
              )}
            />

            <Textarea
              label='Описание'
              placeholder='Расскажите о себе'
              className={styles.textareaWrapper}
              textareaClassName={styles.textarea}
              {...editProfile('bio', { required: true })}
            />

            <div className={styles.buttons}>
              <Button
                variant='primary'
                title='Сохранить'
                className={styles.buttonSubmit}
                htmlType='submit'
                disabled={!isDirty}
                onClick={() => {
                  /* сделать вызов санки для редактирования профиля */
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
