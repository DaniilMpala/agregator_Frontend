import React from "react";
import styles from "./GrayButton.module.css";

interface Props {
  children: React.ReactNode;
  className?: string
  onClick?: () => void
}
const Button: React.FC<Props> = ({children, className, onClick}) => {
  return <button onClick={onClick} className={styles.button+" "+className}>{children}</button>;
};

export default Button;
