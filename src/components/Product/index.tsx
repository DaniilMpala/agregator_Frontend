import React, { useContext, useEffect, useState } from "react";
import Card from "../MiniComponents/Card";
import styles from "./Product.module.css";
import ax from "axios";
import { product } from "../../Contexts/productReducer";
import PriceFilter from "../MiniComponents/PriceFilter";
import OptionsList, { IOption } from "../MiniComponents/OptionsList";
import GrayButton from "../MiniComponents/GrayButton";
import SocialNetwork from "../MiniComponents/SocialNetwork";

// TODO: Сделать desc на беке (+сервис)
interface API$Option {
  v: string;
  desc?: string;
}
const filterMapper = ({ v, desc }: API$Option): IOption =>
  desc
    ? {
        value: v,
        label: v,
        checked: false,
        description: desc,
      }
    : {
        value: v,
        label: v,
        checked: false,
      };

const Product: React.FC = () => {
  // const { state, dispatch } = useContext(product);

  const [valueSlider, setValueSlider] = useState<IPriceSlider>({
    selected: [0, 100],
    static: [0, 100],
  });

  const [marketFilters, setMarketFilters] = useState<IOption[]>([]);
  const [brandFilters, setBrandFilters] = useState<IOption[]>([]);

  useEffect(() => {
    ax.post("api/product/getOptionsFilter").then(
      ({ data: { shops, brand, minPrice, maxPrice } }) => {
        setMarketFilters(shops.map(filterMapper));
        setBrandFilters(brand.map(filterMapper));

        setValueSlider({
          selected: [minPrice, maxPrice],
          static: [minPrice, maxPrice],
        });
      }
    );
  }, []);

  const toogleSelectMarket = (v: string) => {
    const newFilters = marketFilters.map((filter) =>
      v === filter.value
        ? {
            ...filter,
            checked: !filter.checked,
          }
        : filter
    );

    setMarketFilters(newFilters);
  };
  const toogleSelectBrand = (v: string) => {
    const newFilters = brandFilters.map((filter) =>
      v === filter.value
        ? {
            ...filter,
            checked: !filter.checked,
          }
        : filter
    );

    setBrandFilters(newFilters);
  };

  return (
    <div className={styles.product}>
      <div>
        <PriceFilter
          valueSlider={valueSlider}
          setValueSlider={setValueSlider}
        />
        <OptionsList
          options={marketFilters}
          title="Выбор магазина"
          onSelect={toogleSelectMarket}
        />
        <OptionsList
          options={brandFilters}
          title="Выбор производителя"
          onSelect={toogleSelectBrand}
        />
        <GrayButton className={styles.button__apply}>Применить</GrayButton>
        <SocialNetwork vertical={false} className={styles.social} />
      </div>
      <div>
        <Card
          info={[
            {
              img: null,
              title:
                "Конфеты КОРКУНОВ Ассорти из молочного шоколада, Россия, 192 г",
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

export default Product;
