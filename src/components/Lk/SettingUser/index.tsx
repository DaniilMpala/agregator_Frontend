import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import styles from "./SettingUser.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { AuthContext } from "../../../Contexts/Auth";
import Avatar from "./Avatar.svg";
const SettingUser: React.FC = () => {
  const navigate = useNavigate();
  const [Auth] = useContext(AuthContext);

  useEffect(() => {
    if (!Auth.auth) {
      navigate(`/lk/auth`);
    }
  }, []);
  return (
    <main className={styles.main}>
      <Navbar />
      <div>
        <h3 className={styles.title}>Настройки</h3>
        <div className={styles.block_user}>
          <img src={Avatar} alt="" />
          <div className={styles.block_user_info}>
            <h4 className={styles.title_or_username}>{Auth.login?.split("@")[0]}</h4>
            <div>
              <p>Подключенная почта: <span>{Auth.login}</span></p>
              <p>Пароль: <button>Изменить</button></p>
              <p>Вы находитесь на: <span>ул. Доброжелтейская д.45</span></p>
            </div>
          </div>
        </div>
        <div className={styles.block_notife}>
            <h4 className={styles.title_or_username}>Уведомление</h4>
            <div>
              <p>Уведомлять о акциях на любимые товары <input></input></p>
            </div>
          </div>
      </div>
      
    </main>
  );
};

export default SettingUser;
