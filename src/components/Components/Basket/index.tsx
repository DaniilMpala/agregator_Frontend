import React, { useContext, useRef, useState } from "react";
import styles from "./Basket.module.css";
import BasketSvg from "./basket.svg";
import basketMoreItems from "./basketMoreItems.svg";
import BasketNoItems from "./basketNoItems.svg";
import rePost from "./rePost.svg";
import save from "./save.svg";
import arrow from "./arrow.svg";
import { ReactSVG } from "react-svg";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../../../Contexts/Basket";
import { AuthContext } from "../../../Contexts/Auth";
import * as API from "../../../utils/api";
import ReanderShop from "./ReanderShop";


const Basket: React.FC = () => {
  const refCloseBasket = useRef() as React.MutableRefObject<HTMLInputElement>
  const refShodowButtonIcon = useRef() as React.MutableRefObject<HTMLButtonElement>
  const [baskettState, basketDispatch] = useContext(BasketContext);
  const [Auth] = useContext(AuthContext);

  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false); //false b dybpe d aeyrwbb nj;t

  const summaBasket = () => {
    let summa = 0;
    for (const shop in baskettState)
      summa += baskettState[shop].reduce((all, cur) => all + cur.value, 0);

    return summa.toFixed(2);
  };

  const closeBasket = () => {
    if(refCloseBasket?.current){
      refCloseBasket.current.className = styles.close_basket
      setTimeout(() => setOpen(false), 300)
    }
      
  }
  const openBasket = () => {
    refShodowButtonIcon.current.className = styles.basket_icon_close
    setTimeout(() => setOpen(true), 300)
  }
  const saveBasket = async () => {
    let tmp:API$ISaveBasketInProfile = {}
    for (const shopTitle in baskettState) {
      tmp[shopTitle] = baskettState[shopTitle].map(v => v._id)
    }

    const {result, textMessage} = await API.saveBasketInProfile(tmp)

    alert(textMessage)

    // if(!result){
    //   alert("Произошла ошибка сохранение корзины :(")
    // }else{
      
    // }
  }


  return (
    <div>
      {!isOpen ? (
        <button
          onClick={openBasket}
          ref={refShodowButtonIcon}
          className={styles.basket_icon}
        >
          <img src={Object.keys(baskettState).length > 0 ? basketMoreItems :  BasketSvg} alt="" />
        </button>
      ) : (
        <div onPointerLeave={closeBasket} ref={refCloseBasket} className={styles.open_basket}>
          <div className={styles.basket_info}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <div className={styles.info}>
              <p>*******Информация*******</p>
              <p>Дата создания {new Date().toLocaleDateString()}</p>
              <p>Сумма чека {summaBasket()} ₽</p>
            </div>
          </div>
          <div className={styles.list}>
            {Object.keys(baskettState).length === 0 ? (
              <div className={styles.no_items}>
                <span>Ваша корзина пуста :(</span>
                <img src={BasketNoItems} alt="" />
              </div>
            ) : (
              Object.keys(baskettState).map((shopLabel:string, i) => <ReanderShop key={i} data={baskettState[shopLabel]} shopLabel={shopLabel} />)
            )}
          </div>
          <div className={styles.button_list_addition}>
            <button title="Поделится корзиной" className={styles.button_addition}>
              <ReactSVG src={rePost} className={styles.button_addition_svg} />
            </button>
            <button title="Сохраненеи корзины в вашем профиле" onClick={saveBasket} disabled={!Auth.auth} className={styles.button_addition}>
              <ReactSVG src={save} className={styles.button_addition_svg} />
            </button>
            {Object.keys(baskettState).length === 0 ? (
              <button
                onClick={() => navigate(`/products`)}
                className={styles.go}
              >
                Перейти в каталог продкутов
                <ReactSVG src={arrow} />
              </button>
            ) : (
              <span className={styles.info_value}>
                К оплате
                <span>{summaBasket()} ₽</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
