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
import { BasketActionsTypes, BasketContext, ProductsBasket } from "../../../Contexts/Basket";
import defaultImg from "./defaultImg.svg";
import Delete from "./delete.svg";
import { month } from "../../../global/variable";



const Basket: React.FC = () => {
  const refCloseBasket = useRef() as React.MutableRefObject<HTMLInputElement>
  const refShodowButtonIcon = useRef() as React.MutableRefObject<HTMLButtonElement>
  const [baskettState, basketDispatch] = useContext(BasketContext);

  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false); //false b dybpe d aeyrwbb nj;t

  const summaBasket = () => {
    let summa = 0;
    for (const shop in baskettState)
      summa += baskettState[shop].reduce((all, cur) => all + cur.value, 0);

    return summa.toFixed(2);
  };

  const closeBasket = () => {
    refCloseBasket.current.className = styles.close_backet
    setTimeout(() => setOpen(false), 300)
  }
  const openBasket = () => {
    refShodowButtonIcon.current.className = styles.basket_icon_close
    setTimeout(() => setOpen(true), 300)
  }

  const removeInBasket = (item: ProductsBasket) => {
    basketDispatch({
      type: BasketActionsTypes.REMOVE_ITEM,
      payload: item,
    });
  };
  const ItemRender = (item: ProductsBasket) => {
    return (
      <div  className={styles.item}>
        <img
          className={styles.img}
          src={item.img ? item.img : defaultImg}
          alt=""
        />
        <div className={styles.item_desc}>
          <span
            onClick={() =>
              navigate(`/products?search=${encodeURI(item.description)}`)
            }
            className={styles.item_label}
          >
            {item.description}
          </span>

          {new Date(item.promoEnd).getTime() - new Date().getTime() <
            1000 * 60 * 60 * 24 * 200 && (
            <span className={styles.item_promo}>
              Цена действительна по {new Date(item.promoEnd).getDate()}{" "}
              {month[new Date(item.promoEnd).getMonth()]}
            </span>
          )}
        </div>
        <span className={styles.price}>{item.value} ₽</span>
        <button onClick={() => removeInBasket(item)} className={styles.button_addition}> 
          <img
            className={styles.delete_item}
            src={Delete}
            alt="Удалить из корзины"
          />
        </button>
      </div>
    );
  };
  const ReanderShop = (shopLabel: string) => {
    return (
      <div>
        <div className={styles.shop_label}>
          <img src={baskettState[shopLabel][0].shopsImg} alt="" />
          <span>{shopLabel}</span>
        </div>

        <div>{baskettState[shopLabel].map(ItemRender)}</div>
      </div>
    );
  };

  return (
    <div onMouseLeave={closeBasket}>
      {!isOpen ? (
        <button
          onClick={openBasket}
          ref={refShodowButtonIcon}
          className={styles.basket_icon}
        >
          <img src={Object.keys(baskettState).length > 0 ? basketMoreItems :  BasketSvg} alt="" />
        </button>
      ) : (
        <div ref={refCloseBasket} className={styles.open_backet}>
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
              Object.keys(baskettState).map(ReanderShop)
            )}
          </div>
          <div className={styles.button_list_addition}>
            <button className={styles.button_addition}>
              <ReactSVG src={rePost} className={styles.button_addition_svg} />
            </button>
            <button className={styles.button_addition}>
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
