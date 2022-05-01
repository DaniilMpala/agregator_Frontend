import React from "react";
import styles from "./GrayButton.module.css";

interface Props {
  children: React.ReactNode;
  className?: string
}
const Button: React.FC<Props> = ({children, className}) => {
  return <button className={styles.button+" "+className}>{children}</button>;
};

export default Button;
