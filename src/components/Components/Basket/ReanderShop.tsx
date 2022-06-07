import React, { useContext, useRef, useState } from "react";
import styles from "./Basket.module.css";
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

      <div>{data.map((item:ProductsBasket, i) => <ItemRender key={i} allowedDeleteItem={allowedDeleteItem} item={item} />)}</div>
    </div>
  );
};

export default ReanderShop;
