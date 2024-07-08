import styles from "/public/handicraftCSS/loadingContent.module.css";
export default function LoadingContent(){
    return <section className={styles.dotsContainer}>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
  </section>
  
}