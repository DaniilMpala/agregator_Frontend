import React, { useContext, useEffect, useState } from "react";

import styles from "./SettingUser.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import {
  AuthActionsTypes,
  AuthContext,
  initialStateAuth,
} from "../../../Contexts/Auth";
import Avatar from "./Avatar.svg";
import * as API from "../../../utils/api";
import Preloader from "../../Components/Preloader";

interface IUserInfo {
  geolocation: string;
  notifyFavoriteProducts: boolean;
}

const SettingUser: React.FC = () => {
  const navigate = useNavigate();
  const [Auth, AuthDispath] = useContext(AuthContext);
  const [UserInfo, setUserInfo] = useState({
    loaded: false,
    geolocation: "",
    notifyFavoriteProducts: false,
  });

  const loadUserInfo = async () => {
    const data = await API.getDataUserSetting();

    if (!data.auth) {
      AuthDispath({
        type: AuthActionsTypes.LOGOUT,
        payload: initialStateAuth,
      });
      navigate(`/lk/auth`);
    } else setUserInfo({ ...data, loaded: true });

  };

  useEffect(() => {
    if (!Auth.auth) {
      navigate(`/lk/auth`);
    }

    loadUserInfo();
  }, []);

  const notifyFavoritesProduct = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfo({ ...UserInfo, notifyFavoriteProducts: e.target.checked });

    const data = await API.changeNotifyUser({
      type: "notifyFavoriteProductsPromoAction",
      value: e.target.checked,
    });

    if (!data.auth) {
      AuthDispath({
        type: AuthActionsTypes.LOGOUT,
        payload: initialStateAuth,
      });
      navigate(`/lk/auth`);
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <div>
        <h3 className={styles.title}>Настройки профиля</h3>
        {!UserInfo.loaded ? (
          <Preloader />
        ) : (
          <>
            <div className={styles.block_user}>
              <img src={Avatar} alt="" />
              <div className={styles.block_user_info}>
                <h4 className={styles.title_or_username}>
                  {Auth.login?.split("@")[0]}
                </h4>
                <div>
                  <p>
                    Подключенная почта: <span>{Auth.login}</span>
                  </p>
                  <p>
                    Пароль: <button>Изменить</button>
                  </p>
                  <p>
                    Вы находитесь на:{" "}
                    <span>{UserInfo.geolocation || "НЕ ОПРЕДЕЛЕНО"}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.block_notife}>
              <h4 className={styles.title_or_username}>Уведомление</h4>
              <div>
                <div className={styles.block_notife_label}>
                  <p>Уведомлять о акциях на любимые товары</p>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={UserInfo.notifyFavoriteProducts}
                      onChange={notifyFavoritesProduct}
                    />
                    <span className={styles.slider + " " + styles.round}></span>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SettingUser;
