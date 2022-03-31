import "./Style/CardItem.scss";
import { useState, useEffect } from "react";
import Button from "./Button";
var month = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Ноября",
  "Декабря",
];

export default function CardItem({ data }) {
  const {
    img,
    title,
    shops,
    weight,
    symbol,

    // SymbolPrice,
    // price,
    // oldPrice = false,
    // discount = false,
    // dateDiscount = false,
  } = data;

  const [Shop, serShop] = useState(shops[0]);

  return (
    <div className="CardItem">
      <div className="imgcener">
        {Shop.tovar.promoPercent > 0 ? (
          <div className="discountImg">
            <span>{Shop.tovar.promoPercent}%</span>
          </div>
        ) : (
          ""
        )}
        <img src={img}></img>
      </div>

      <div className="info">
        <div className="infoDicount">
          <div className="infoDicount_Shops">
            {shops.map((v, i) => (
              <img
                onLoad={(e) => console.log("грузится")}
                key={i}
                idShop={i}
                src={v.Shop.img}
                alt={v.Shop.title}
              />
            ))}
          </div>
          {Shop.tovar.promoPercent > 0 ? (
            <>
              <div className="infoDicount_Date">
                <span>
                  с {new Date(Shop.tovar.promoStart).getDate()}{" "}
                  {new Date(Shop.tovar.promoStart).getMonth() !=
                  new Date(Shop.tovar.promoEnd).getMonth()
                    ? month[new Date(Shop.tovar.promoStart).getMonth()]
                    : ""}{" "}
                  по {new Date(Shop.tovar.promoEnd).getDate()}{" "}
                  {month[new Date(Shop.tovar.promoEnd).getMonth()]}
                </span>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="infoDicount_SymbolPrice">
            <span>
              {weight} {symbol} / {Shop.tovar.valueSymbol} за {symbol}
            </span>
          </div>
        </div>
        <span className="Title">{title}</span>
        <div className="list">
          <span className="newPrice">{Shop.tovar.value.toFixed(2)} ₽</span>
          <Button className={"buy"}>В корзину</Button>
        </div>
      </div>
    </div>
  );
}
