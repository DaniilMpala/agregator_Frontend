import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import jwt_decode from "jwt-decode";
import * as API from "../../../utils/api";
import styles from "./Auth.module.css";
import vk from "./vk.svg";
import google from "./google.svg";
import loginSvg from "./login.svg";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const dataAuth = localStorage?.accessToken && jwt_decode(localStorage?.accessToken);
    if (dataAuth && new Date(dataAuth?.exp || 0) > new Date()) {
      navigate(`/lk/setting`);
    }
  }, [])

  const login = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;

  const auth = async () => {
    let res = await API.auth({
      login: login.current.value,
      password: password.current.value,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      navigate(`/lk/setting`);
      localStorage.accessToken = res.accessToken;
    }
  };

  return (
    <main className={styles.mainBlock}>
      <div className={styles.auth}>
        <h3 className={styles.title}>
          Войти или
          <br /> Зарегестрироваться
        </h3>
        <div>
          <input
            ref={login}
            className={styles.input}
            type="text"
            placeholder="Почту"
          />
          <input
            ref={password}
            className={styles.input}
            type="password"
            placeholder="Пароль"
          />
        </div>
        <p>
          Если вы <span>не были зарегестрированы</span>, то автоматически{" "}
          <span>создаться</span> ваша учетная запись
        </p>
        <div className={styles.block_buttons}>
          <button className={styles.button_addition}>
            <img src={vk} alt="" />
          </button>
          <button className={styles.button_addition}>
            <img src={google} alt="" />
          </button>
          <button onClick={auth} className={styles.login}>
            Войти
            <img src={loginSvg} alt="" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Auth;
