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
import {
  BasketActionsTypes,
  BasketContext,
  ProductsBasket,
} from "../../../Contexts/Basket";
import defaultImg from "./defaultImg.svg";
import Delete from "./delete.svg";
import { month } from "../../../global/variable";
import { AuthContext } from "../../../Contexts/Auth";
import * as API from "../../../utils/api";
import ReanderShop from "./ReanderShop";
interface Props {
  item: ProductsBasket;
  allowedDeleteItem: boolean;
}
const ItemRender: React.FC<Props> = ({ item, allowedDeleteItem }) => {
  const [, basketDispatch] = useContext(BasketContext);
  const navigate = useNavigate();
  const removeInBasket = (item: ProductsBasket) => {
    basketDispatch({
      type: BasketActionsTypes.REMOVE_ITEM,
      payload: [item],
    });
  };
  return (
    <div className={styles.item}>
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
      {allowedDeleteItem && (
        <button
          onClick={() => removeInBasket(item)}
          className={styles.button_addition}
        >
          <img
            className={styles.delete_item}
            src={Delete}
            alt="Удалить из корзины"
          />
        </button>
      )}
    </div>
  );
};

export default ItemRender;
