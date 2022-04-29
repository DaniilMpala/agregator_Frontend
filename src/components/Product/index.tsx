import React from "react";
import Card from "../MiniComponents/Card";

import styles from "./Product.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.product}>
      <div>
        Фильтрп
      </div>
      <div>
      <Card
        info={[
          {
            img: null,
            title: "Конфеты КОРКУНОВ Ассорти из молочного шоколада, Россия, 192 г",
            price: 1223.32,
            promoPercent: 123.1,

            id: 272772727277272,

            valueSymbol: 123.12,
            Symbol: "кг",

            shopsImg: "lenta.png",
            promoEnd: new Date("9999-12-31"),
            promoStart: new Date("2022-04-08"),

            productUrl: "String",
          },
          {
            img: "	https://lenta.gcdn.co/globalassets/1/-/50/79/87/241641_3.png?preset=thumbnaillossy-webp",
            title: "Второй продукт",
            price: 123.32,
            promoPercent: 1.1,

            id: 272772727277272,

            valueSymbol: 123.12,
            Symbol: "л",

            shopsImg: "dixy.png",
            promoEnd: new Date("9999-12-31"),
            promoStart: new Date("2022-04-08"),

            productUrl: "String",
          },
          
          {
            img: "	https://lenta.gcdn.co/globalassets/1/-/50/79/87/241641_3.png?preset=thumbnaillossy-webp",
            title: "Второй продукт",
            price: 123.32,
            promoPercent: 1.1,

            id: 272772727277272,

            valueSymbol: 123.12,
            Symbol: "л",

            shopsImg: "dixy.png",
            promoEnd: new Date("9999-12-31"),
            promoStart: new Date("2022-04-08"),

            productUrl: "String",
          },
        ]}
      />
      </div>
      
    </div>
  );
};

export default Header;
