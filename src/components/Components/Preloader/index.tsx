import React from "react";
import styles from "./Preloader.module.css";

interface Props {
  className?: string;
  style?: object;
  sizeCircleAnimation?: string;
}

const classNameProp = (sizeCircleAnimation: string) =>
  sizeCircleAnimation === "standart"
    ? { className: styles.animation }
    : { className: styles.animation_small };

const Preloader: React.FC<Props> = ({
  className = "",
  style = {},
  sizeCircleAnimation = "standart",
}) => {
  return (
    <div style={style} className={styles.block + " " + className}>
      <div {...classNameProp(sizeCircleAnimation)}>
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
