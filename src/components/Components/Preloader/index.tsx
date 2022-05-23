import React from "react";
import styles from "./Preloader.module.css";

const Preloader: React.FC = () => {
  return (
    <div className={styles.block}>
      <div className={styles.animation}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
