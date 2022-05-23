import React, { useState } from "react";

import styles from "./Card.module.css";

import defaultImg from "./defaultImg.svg";

import addCorzina from "./addCorzina.svg";

const month = [
  "янв.",
  "фев.",
  "марта",
  "апр.",
  "мая",
  "июня",
  "июля",
  "авг.",
  "сент.",
  "окт.",
  "ноября",
  "дек.",
];

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

interface Props {
  productsInfos: API$ProductInfo[];
}

// const findMinimumPrice = (productsInfos: API$ProductInfo[]) => {
//   return productsInfos.reduce(
//     (returnItem, currentItem) =>
//       currentItem.value < returnItem.value ? currentItem : returnItem,
//     productsInfos[0]
//   );
// };
const Card: React.FC<Props> = ({ productsInfos }) => {
  const [cardCurrent, setCardCurrent] = useState(productsInfos[0]);

  const switchCard = (index: number) => {
    setCardCurrent(productsInfos[index]);
  };

  return (
    <div className={styles.card}>
      <div className={styles.blockCard}>
        <img
          className={styles.imgItem}
          src={cardCurrent.img ? cardCurrent.img : defaultImg}
          alt=""
        />

        {Boolean(cardCurrent.promoPercent) && (
          <span
            style={{
              backgroundColor:
                cardCurrent.promoPercent < 21 ? "#ffb122" : "#FF5959",
            }}
            className={styles.discount}
          >
            {!isNaN(cardCurrent.promoPercent)
              ? `-${cardCurrent.promoPercent}%`
              : cardCurrent.promoPercent}
          </span>
        )}
        <LoveBox />
      </div>
      <div className={styles.item_shops}>
        <div className={styles.item_shops_block}>
          {productsInfos.length > 1 && (
            <div className={styles.listShops}>
              {productsInfos.map(({ shopsImg, id, titleShops }, i) => (
                <img
                  key={id}
                  src={shopsImg}
                  onClick={() => switchCard(i)}
                  alt={titleShops}
                ></img>
              ))}
            </div>
          )}

          <img src={cardCurrent.shopsImg} alt=""></img>
          {new Date(cardCurrent.promoEnd).getTime() - new Date().getTime() <
            1000 * 60 * 60 * 24 * 200 && (
            <span className={styles.dateInfo}>
              по {new Date(cardCurrent.promoEnd).getDate()}{" "}
              {month[new Date(cardCurrent.promoEnd).getMonth()]}
            </span>
          )}
        </div>

        {cardCurrent.valueSymbol && (
          <span className={styles.vlueSymbol}>
            {cardCurrent.valueSymbol} ₽ / {cardCurrent.symbol}
          </span>
        )}
      </div>
      <p className={styles.title}>{cardCurrent.description}</p>
      <div className={styles.price_item}>
        <span>{cardCurrent.value} ₽</span>
        <img src={addCorzina} alt="" />
      </div>
    </div>
  );
};

export default Card;
