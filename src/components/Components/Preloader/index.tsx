import React from "react";
import styles from "./Preloader.module.css";

interface Props {
  className?: string
  style?: object
}

const Preloader: React.FC<Props> = ({className = "", style = {}}) => {
  return (
    <div style={style} className={styles.block + " " + className}>
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
