import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./Navbar.module.css";

const slideActive = classNames({
  [styles.slide_link__active]: true,
  [styles.slide_link]: true,
});

const classNameProp = {
  className: ({ isActive }: { isActive: boolean }) =>
    isActive ? slideActive : styles.slide_link,
};

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <NavLink {...classNameProp} to="/">
        Главная
      </NavLink>
      <NavLink {...classNameProp} to="products">
        Продукты
      </NavLink>
      <NavLink {...classNameProp} to="pharmacies">
        Аптеки
      </NavLink>
    </div>
  );
};

export default Navbar;
