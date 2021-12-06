import styles from './LoadingPage.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.container}>
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
      </div>
    </div>
  );
};

export default LoadingPage;
