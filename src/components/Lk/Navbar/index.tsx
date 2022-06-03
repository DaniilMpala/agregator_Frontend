import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./Navbar.module.css";

const slideActive = classNames({
  [styles.slide_link__active]: true,
  [styles.slide_link]: true,
});

export const classNameProp = {
  className: ({ isActive }: { isActive: boolean }) =>
    isActive ? slideActive : styles.slide_link,
};

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <NavLink {...classNameProp} to="/lk/setting">
        Настройки
      </NavLink>
      <NavLink {...classNameProp} to="/lk/favoriteProducts">
        Любимые товары
      </NavLink>
    </div>
  );
};

export default Navbar;
