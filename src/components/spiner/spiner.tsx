import React from "react";
import styles from "./spinner.module.scss";

export const Spinner = () => (
  <div className={styles.loadingSpinner}>
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
);
