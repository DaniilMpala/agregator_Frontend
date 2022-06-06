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
import { BasketActionsTypes, BasketContext, BasketState, ProductsBasket } from "../../../Contexts/Basket";
import defaultImg from "./defaultImg.svg";
import Delete from "./delete.svg";
import { month } from "../../../global/variable";
import { AuthContext } from "../../../Contexts/Auth";
import * as API from "../../../utils/api";
import ItemRender from "./ItemRender";

interface Props{
  shopLabel: string
  data:ProductsBasket[]
  allowedDeleteItem?: boolean
}

const ReanderShop: React.FC<Props> = ({shopLabel, data, allowedDeleteItem = true}) => {
  return (
    <div>
      <div className={styles.shop_label}>
        <img src={"/"+data[0].shopsImg} alt="" />
        <span>{shopLabel}</span>
      </div>

      <div>{data.map((item:ProductsBasket) => <ItemRender allowedDeleteItem={allowedDeleteItem} item={item} />)}</div>
    </div>
  );
};

export default ReanderShop;
