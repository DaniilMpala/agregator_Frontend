import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import jwt_decode from "jwt-decode";
import * as API from "../../../utils/api";
import styles from "./Auth.module.css";
import vk from "./vk.svg";
import google from "./google.svg";
import loginSvg from "./login.svg";
import { useNavigate } from "react-router-dom";
import { AuthActionsTypes, AuthContext } from "../../../Contexts/Auth";
import Preloader from "../../Components/Preloader";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [Auth, AuthDispath] = useContext(AuthContext);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    if (Auth.auth) {
      navigate(`/lk/setting`);
    }
  }, []);

  const login = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;

  const auth = async () => {
    setLoadingAuth(true);
    let res = await API.auth({
      login: login.current.value,
      password: password.current.value,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      AuthDispath({
        type: AuthActionsTypes.AUTHORIZATION,
        payload: {
          accessToken: res.accessToken || "",
          exp: "",
          auth: true,
        },
      });

      navigate(`/lk/setting`);
    }

    setLoadingAuth(false);
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
          {!loadingAuth ? (
            <button onClick={auth} className={styles.login}>
              Войти
              <img src={loginSvg} alt="" />
            </button>
          ) : (
            <Preloader sizeCircleAnimation={"small"} className={styles.preloading}  />
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
