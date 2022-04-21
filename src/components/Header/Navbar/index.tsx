import React from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const slideActive = classNames({
  [styles.slideLinkActive]: true,
  [styles.slideLink]: true,
})
const Navbar: React.FC = () => {
  let location = useLocation().pathname;
  return (
    <div className={styles.navbar}>
      <Link className={location === "/" ? slideActive : styles.slideLink} to="/">Главная</Link>
      <Link className={location === "/products" ? slideActive : styles.slideLink} to="products">Продукты</Link>
      <Link className={location === "/pharmacies" ? slideActive : styles.slideLink} to="pharmacies">Аптеки</Link>
    </div>
  );
};

export default Navbar;
