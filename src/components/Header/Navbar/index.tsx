import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./Navbar.module.css";

const slideActive = classNames({
  [styles.slideLinkActive]: true,
  [styles.slideLink]: true,
});

const classNameProp = {
  className: ({ isActive }: { isActive: boolean }) =>
    isActive ? slideActive : styles.slideLink,
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
