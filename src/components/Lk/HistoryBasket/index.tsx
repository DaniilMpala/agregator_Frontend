import React, { useContext, useEffect, useState } from "react";
import stylesBasket from "../../Components/Basket/Basket.module.css";
import styles from "./HistoryBasket.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import {
  AuthActionsTypes,
  AuthContext,
  initialStateAuth,
} from "../../../Contexts/Auth";
import useAsyncEffect from "../../../hooks/useAsyncEffect";
import * as API from "../../../utils/api";
import {
  BasketActionsTypes,
  BasketContext,
  BasketState,
  convertBasketInArray,
} from "../../../Contexts/Basket";
import InfiniteScroll from "react-infinite-scroll-component";
import Preloader from "../../Components/Preloader";
import ReanderShop from "../../Components/Basket/ReanderShop";
import Logo from "../../Components/Logo";
import rePost from "../../Components/Basket/rePost.svg";
import deleteSvg from "../../Components/Basket/delete.svg";
import unload from "./unload.svg";
import { ReactSVG } from "react-svg";
import { repostBasket } from "../../Components/Basket";

const HistoryBasket: React.FC = () => {
  const navigate = useNavigate();
  const [Auth, AuthDispath] = useContext(AuthContext);
  const [savedBaskets, setSavedBaskets] = useState<API$SaveBasket[]>([]);
  const [, basketDispatch] = useContext(BasketContext);

  const loadSaveBasket = async () => {
    const data = await API.getDataSaveBasket({ skip: savedBaskets.length });

    if (!data.auth) {
      AuthDispath({
        type: AuthActionsTypes.LOGOUT,
        payload: initialStateAuth,
      });
      navigate(`/lk/auth`);
    } else setSavedBaskets([...savedBaskets, ...data.data]);
  };

  useAsyncEffect(async () => {
    if (!Auth.auth) {
      navigate(`/lk/auth`);
    }

    loadSaveBasket();
  }, []);

  const summaBasket = (index: number) => {
    let summa = 0;
    for (const shop in savedBaskets[index].data)
      summa += savedBaskets[index].data[shop].reduce(
        (all, cur) => all + cur.value,
        0
      );

    return summa.toFixed(2);
  };

  const deleteSaveBasket = async (index: number) => {
    const { auth, result } = await API.updateDataSaveBasket({ index });
    if (!auth) {
      AuthDispath({
        type: AuthActionsTypes.LOGOUT,
        payload: initialStateAuth,
      });
      navigate(`/lk/auth`);
    } else if (result) {
      savedBaskets.splice(index, 1);
      setSavedBaskets([...savedBaskets]);
    } else {
      alert("Произошла не предвиденная ошибка :(");
    }
  };

  const unloadBasket = async (basket: BasketState) => {
    basketDispatch({
      type: BasketActionsTypes.LOAD_BASKET,
      payload: await convertBasketInArray(basket),
    });
  };

  const renderBasket = (basket: API$SaveBasket, i: number) => (
    <div id={`Basket${i}`} className={styles.basket} key={i}>
      <div className={stylesBasket.basket_info}>
        <div className={stylesBasket.logo}>
          <Logo />
        </div>
        <div className={stylesBasket.info}>
          <p>*******Информация*******</p>
          <p>Дата создания {new Date(basket.date).toLocaleDateString()}</p>
          <p>Сумма чека {summaBasket(i)} ₽</p>
        </div>
      </div>
      <div className={stylesBasket.list}>
        {Object.keys(basket.data).map((shopLabel: string, i) => (
          <ReanderShop
            key={i}
            allowedDeleteItem={false}
            data={basket.data[shopLabel]}
            shopLabel={shopLabel}
          />
        ))}
      </div>
      <div className={stylesBasket.button_list_addition}>
        <button
          title="Поделится корзиной"
          className={stylesBasket.button_addition}
          onClick={() =>
            repostBasket(
              document.getElementById(`Basket${i}`) as HTMLElement,
              new Date(basket.date).toLocaleDateString()
            )
          }
        >
          <ReactSVG src={rePost} className={stylesBasket.button_addition_svg} />
        </button>
        <button
          title="Удалить из сохраненных корзи"
          onClick={() => deleteSaveBasket(i)}
          className={stylesBasket.button_addition}
        >
          <ReactSVG
            src={deleteSvg}
            className={stylesBasket.button_addition_svg}
          />
        </button>
        <button
          onClick={() => unloadBasket(basket.data)}
          className={stylesBasket.go}
        >
          Выгрузить в корзину
          <ReactSVG src={unload} />
        </button>
      </div>
    </div>
  );

  return (
    <main className={styles.main}>
      <Navbar />
      <div>
        <h3 className={styles.title}>Сохраненные корзины</h3>
        <InfiniteScroll
          className={styles.items_list}
          dataLength={savedBaskets.length}
          next={loadSaveBasket}
          hasMore={true}
          loader={<Preloader className={styles.preloader} />}
        >
          {savedBaskets.map(renderBasket)}
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default HistoryBasket;
