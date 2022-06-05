import React, { useContext, useRef, useState } from "react";

import styles from "./Card.module.css";

import defaultImg from "./defaultImg.svg";
import loveSvg from "./love.svg";

import addCorzina from "./addCorzina.svg";
import { BasketContext, BasketActionsTypes } from "../../../Contexts/Basket";
import { month } from "../../../global/variable";
import { makeFavoriteApi, sendRequestUpdateDemandItem } from "../../../utils/api";
import { ReactSVG } from "react-svg";

interface Love{
  favorit:boolean
  onClick: () => void
}
const LoveBox: React.FC<Love> = ({favorit, onClick}) => {
  return (
    <ReactSVG
      className={styles.love}
      src={loveSvg}
      beforeInjection={(svg: {
        classList: { add: (arg0: string) => void };
      }) => {
        if(favorit)
          svg.classList.add(styles.love_favoit);
        else
          svg.classList.add(styles.love_none_favoit);
      }}
      onClick={onClick}
    />
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
  const [, basketDispatch] = useContext(BasketContext);
  const refRestartAnimation = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [cardCurrent, setCardCurrent] = useState(productsInfos[0]);

  const [favorit, setFavorit] = useState(productsInfos[0].favorit);

  const switchCard = (index: number) => {
    setCardCurrent(productsInfos[index]);

    refRestartAnimation.current.classList.remove(styles.animtaion);
    //Что то типо принудительного обновления
    setTimeout(
      () => refRestartAnimation.current.classList.add(styles.animtaion),
      0
    );
  };
  const addInBasket = (item: API$ProductInfo) => {
    basketDispatch({
      type: BasketActionsTypes.ADD_ITEM,
      payload: item,
    });

    sendRequestUpdateDemandItem({ _id: cardCurrent._id });
  };

  const makeFavorite = async () => {
    const {result} = await makeFavoriteApi({_id: cardCurrent._id, now: cardCurrent.favorit})
    
    if(result){
      setFavorit(!favorit)
    }else alert("Для начало надо войти в личный кабинет")
    
  }

  return (
    <div ref={refRestartAnimation} className={styles.card}>
      <div className={styles.blockCard}>
        <img
          className={styles.img_item}
          src={cardCurrent.img ? cardCurrent.img : defaultImg}
          onError={({ currentTarget }) => (currentTarget.src = defaultImg)}
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
        <LoveBox onClick={makeFavorite} favorit={favorit}/>
      </div>
      <div className={styles.item_shops}>
        <div className={styles.item_shops_block}>
          {productsInfos.length > 1 && (
            <div className={styles.listShops}>
              {productsInfos.map(({ shopsImg, titleShops }, i) => (
                <img
                  key={i}
                  src={"/"+shopsImg}
                  onClick={() => switchCard(i)}
                  alt={titleShops}
                ></img>
              ))}
            </div>
          )}

          <img src={"/"+cardCurrent.shopsImg} alt=""></img>
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
        <img onClick={() => addInBasket(cardCurrent)} src={addCorzina} alt="" />
      </div>
    </div>
  );
};

export default Card;
