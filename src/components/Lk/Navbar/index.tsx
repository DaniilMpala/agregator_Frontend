import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Navbar.module.css";
import { AuthActionsTypes, AuthContext, initialStateAuth } from "../../../Contexts/Auth";

const slideActive = classNames({
  [styles.slide_link__active]: true,
  [styles.slide_link]: true,
});

export const classNameProp = {
  className: ({ isActive }: { isActive: boolean }) =>
    isActive ? slideActive : styles.slide_link,
};

const Navbar: React.FC = () => {
  const [Auth, AuthDispath] = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    AuthDispath({
      type: AuthActionsTypes.LOGOUT,
      payload: initialStateAuth,
    });
    navigate(`/lk/auth`);
    
  }
  return (
    <div className={styles.navbar}>
      <NavLink {...classNameProp} to="/lk/setting">
        Настройки
      </NavLink>
      <NavLink {...classNameProp} to="/lk/favoriteShop">
        Любимые магазины
      </NavLink>
      <NavLink {...classNameProp} to="/lk/favoriteProducts">
        Любимые товары
      </NavLink>
      <NavLink {...classNameProp} to="/lk/historyBasket">
        История чеков
      </NavLink>
      <button onClick={logOut} className={styles.slide_link} >Выйти</button>
    </div>
  );
};

export default Navbar;
