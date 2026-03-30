import bulbImg from '@/shared/assets/images/light-bulb.svg?url';
import boardImg from '@/shared/assets/images/school-board.svg?url';
import userImg from '@/shared/assets/images/user-info.svg?url';

import { QAuthBar } from '@/widgets/qauth-login-bar';
import { RegistrationEmailUI } from '@/widgets/registration-email-form';
import { SkillFormUI } from '@/widgets/registration-skill-form';
import { RegistrationUI } from '@/widgets/registration-ui';
import { UserFormUI } from '@/widgets/registration-user-form';

import styles from './registration.module.scss';
import type {
  RegistrationSkillProps,
  RegistrationUserProps,
  RegistrationEmailProps
} from './types';

export const RegistrationUser = ({
  onPrevClick,
  onNextClick,
  defaultValues
}: RegistrationUserProps) => (
  <RegistrationUI
    imageSrc={userImg}
    title='Расскажите немного о себе'
    description='Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
  >
    <UserFormUI
      prevStepClick={onPrevClick}
      nextStepClick={onNextClick}
      defaultValues={defaultValues}
    />
  </RegistrationUI>
);

export const RegistrationSkill = ({
  onPrevClick,
  onNextClick,
  defaultValues
}: RegistrationSkillProps) => (
  <RegistrationUI
    imageSrc={boardImg}
    title='Укажите, чем вы готовы поделиться'
    description='Так другие люди смогут увидеть ваши предложения и предложить вам обмен!'
  >
    <SkillFormUI
      prevStepClick={onPrevClick}
      nextStepClick={onNextClick}
      defaultValues={defaultValues}
    />
  </RegistrationUI>
);

export const RegistrationEmail = ({
  onNextClick,
  defaultValues
}: RegistrationEmailProps) => (
  <RegistrationUI
    imageSrc={bulbImg}
    title='Добро пожаловать в SkillSwap!'
    description='Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
  >
    <div className={styles.wrapper}>
      <QAuthBar />
      <div className={styles.separator}>
        <p className={styles.text}>или</p>
      </div>
      <RegistrationEmailUI
        onButtonClick={onNextClick}
        defaultValues={defaultValues}
      />
    </div>
  </RegistrationUI>
);
