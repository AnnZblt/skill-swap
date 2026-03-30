import styles from './skeleton.module.scss';

export const Skeleton = () => (
  <div className={styles.container}>
    <article className={styles.skeletonCard}>
      <div className={styles.user}>
        <div className={styles.image} />
        <div className={styles.info}>
          <div className={styles.like} />
          <div className={styles.details}>
            <div className={styles.userName} />
            <div className={styles.userData} />
          </div>
        </div>
      </div>
      <div className={styles.skills}>
        <div className={styles.skill}>
          <div className={styles.skillTitle} />
          <div className={styles.skillTag} />
        </div>
        <div className={styles.skill}>
          <div className={styles.skillTitle} />
          <div className={styles.skillTags}>
            <div className={styles.skillTag} />
            <div className={styles.skillTag} />
            <div className={styles.skillTagShort} />
          </div>
        </div>
      </div>
      <div className={styles.button} />
    </article>
    <article className={styles.skeletonCard}>
      <div className={styles.user}>
        <div className={styles.image} />
        <div className={styles.info}>
          <div className={styles.like} />
          <div className={styles.details}>
            <div className={styles.userName} />
            <div className={styles.userData} />
          </div>
        </div>
      </div>
      <div className={styles.skills}>
        <div className={styles.skill}>
          <div className={styles.skillTitle} />
          <div className={styles.skillTag} />
        </div>
        <div className={styles.skill}>
          <div className={styles.skillTitle} />
          <div className={styles.skillTags}>
            <div className={styles.skillTag} />
            <div className={styles.skillTag} />
            <div className={styles.skillTagShort} />
          </div>
        </div>
      </div>
      <div className={styles.button} />
    </article>
    <article className={styles.skeletonCard}>
      <div className={styles.user}>
        <div className={styles.image} />
        <div className={styles.info}>
          <div className={styles.like} />
          <div className={styles.details}>
            <div className={styles.userName} />
            <div className={styles.userData} />
          </div>
        </div>
      </div>
      <div className={styles.skills}>
        <div className={styles.skill}>
          <div className={styles.skillTitle} />
          <div className={styles.skillTag} />
        </div>
        <div className={styles.skill}>
          <div className={styles.skillTitle} />
          <div className={styles.skillTags}>
            <div className={styles.skillTag} />
            <div className={styles.skillTag} />
            <div className={styles.skillTagShort} />
          </div>
        </div>
      </div>
      <div className={styles.button} />
    </article>
  </div>
);
