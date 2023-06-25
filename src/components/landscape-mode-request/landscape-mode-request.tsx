"use client";

import styles from "./landscape-mode-request.module.scss";

export const LandscapeModeRequest = () => (
  <div className={styles.landscapeModeRequest}>
    <img
      className={styles.landscapeModeRequest__image}
      src="/images/landscape-mode.png"
      alt=""
    />
  </div>
);
