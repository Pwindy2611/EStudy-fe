import styles from '/public/handicraftCSS/loading.module.css';

export default function LoadingEvent() {
  return (
    <div className="bg-white flex w-full h-full z-20 fixed top-0 left-0 bg-fixed right-0 bottom-0">
      <div className="m-auto">
        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40" id="test"></circle>
          </svg>
        </div>

        <div className={`${styles.loader} ${styles.triangle}`}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <rect height="64" width="64" y="8" x="8"></rect>
          </svg>
        </div>
      </div>
    </div>
  );
}
