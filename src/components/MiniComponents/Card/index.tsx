import { title } from "process";
import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from "./Card.module.css";
import defaultImg from "./defaultImg.svg";
import addCorzina from "./addCorzina.svg";

var month = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октябрь",
  "ноября",
  "декабря",
];
interface Info {
  img: string | null;
  title: string;
  price: number;
  promoPercent: number;

  id: number;

  valueSymbol: number;
  Symbol: string;

  shopsImg: string;
  promoEnd: Date;
  promoStart: Date;

  productUrl?: string;
  textDate?: string;
}
interface Props {
  info: Info[];
}
const LoveBox: React.FC = () => {
  return (
    <svg
      className={styles.love}
      width="21"
      height="23"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5509 0C18.4186 0 20.7408 2.32174 20.7408 5.18378C20.7408 10.3676 15.5509 13.3191 10.3676 18.5029C5.18378 13.3191 0 10.3676 0 5.18383C0 2.32179 2.32221 4.75081e-05 5.18378 4.75081e-05C7.77543 4.75081e-05 9.0715 1.29611 10.3676 3.88776C11.6632 1.29611 12.9592 0 15.5509 0Z"
        fill="#C8C8C8"
      />
    </svg>
  );
};
const Card: React.FC<Props> = ({ info }) => {
  const [cardCurrent, setCardCurrent] = useState(info[0]);


  const switchCard = (index: number) => {
    setCardCurrent(info[index]);
  };

  return (
    <div className={styles.card}>
      <div className={styles.blockCard}>
      <img
            className={styles.imgItem}
            src={cardCurrent.img ? cardCurrent.img : defaultImg}
            alt=""
          />

        <span
          style={{
            backgroundColor:
              cardCurrent.promoPercent < 21 ? "#ffb122" : "#FF5959",
          }}
          className={styles.discount}
        >
          -{cardCurrent.promoPercent}%
        </span>
        <LoveBox />
      </div>
      <div className={styles.infoShop}>
        {info.length > 1 ? (
          <div className={styles.listShops}>
            {info.map((v, i) => (
              <img
                src={v.shopsImg}
                key={i}
                onClick={() => switchCard(i)}
                alt=""
              ></img>
            ))}
          </div>
        ) : (
          ""
        )}

        <img src={cardCurrent.shopsImg} alt=""></img>
        <span className={styles.dateInfo}>
          {/* с {new Date(cardCurrent.promoStart).getDate()}{" "}
          {new Date(cardCurrent.promoStart).getMonth() !=
          new Date(cardCurrent.promoEnd).getMonth()
            ? month[new Date(cardCurrent.promoStart).getMonth()]
            : ""}{" "} */}
          по {new Date(cardCurrent.promoEnd).getDate()}{" "}
          {month[new Date(cardCurrent.promoEnd).getMonth()]}
        </span>

        <span className={styles.vlueSymbol}>
          {cardCurrent.valueSymbol} ₽ / {cardCurrent.Symbol}
        </span>
      </div>
      <p>{cardCurrent.title}</p>
      <div className={styles.priceItem}>
        <span>{cardCurrent.price} ₽</span>
        <img src={addCorzina} alt="" />
      </div>
    </div>
  );
};

export default Card;
