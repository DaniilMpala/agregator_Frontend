import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./Navbar.module.css";
import { ReactSVG } from "react-svg";
import iconLk from "./iconLk.svg";

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
      <div>
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

      <NavLink className={styles.lk} to="lk/auth">
        <span>Личный кабинет</span>
        <ReactSVG
          src={iconLk}
          beforeInjection={(svg: {
            classList: { add: (arg0: string) => void };
          }) => {
            svg.classList.add(styles.header_icon_lk);
          }}
        />
      </NavLink>
    </div>
  );
};

export default Navbar;
