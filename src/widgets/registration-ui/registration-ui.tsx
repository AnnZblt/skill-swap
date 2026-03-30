import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import styles from './registration-ui.module.scss';
import type { RegistrationUIProps } from './types';

export const RegistrationUI = ({
  children,
  imageSrc,
  title,
  description
}: RegistrationUIProps) => (
  <section className={styles.container}>
    <div className={styles.formContent}>{children}</div>

    <div className={styles.side}>
      <img src={imageSrc} alt={title} className={styles.sideImage} />
      <div className={styles.textContainer}>
        <Title text={title} as='p' size='l' className={styles.title} />
        <Text
          textContent={description}
          as='p'
          size='s'
          className={styles.description}
        />
      </div>
    </div>
  </section>
);
