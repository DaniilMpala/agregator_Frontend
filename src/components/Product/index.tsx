import React, { useState } from "react";

import * as API from "../../utils/api";
import { useAsyncEffect } from "../../hooks";
import Card from "../MiniComponents/Card";
import PriceFilter, { PriceRange } from "../MiniComponents/PriceFilter";
import OptionsList, { Option } from "../MiniComponents/OptionsList";
import GrayButton from "../MiniComponents/GrayButton";
import SocialNetwork from "../MiniComponents/SocialNetwork";
import styles from "./Product.module.css";

// TODO: Сделать desc на беке (+сервис)

const mockProductInfo: API$ProductInfo[] = [
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
];

const filterMapper = ({ v, desc }: API$Filter): Option =>
  // (?) Наверное когда-то поле checked тоже будет приходить
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
  const [marketFilters, setMarketFilters] = useState<Option[]>([]);
  const [brandFilters, setBrandFilters] = useState<Option[]>([]);
  const [rangeValue, setRangeValue] = useState<PriceRange>({
    selected: [0, 100],
    limits: [0, 100],
  });

  useAsyncEffect(async () => {
    const { shops, brand, minPrice, maxPrice } = await API.getFilters();

    setMarketFilters(shops.map(filterMapper));
    setBrandFilters(brand.map(filterMapper));
    setRangeValue({
      selected: [minPrice, maxPrice],
      limits: [minPrice, maxPrice],
    });
  }, []);

  return (
    <div className={styles.product}>
      <div>
        <PriceFilter rangeValue={rangeValue} setRangeValue={setRangeValue} />
        <OptionsList
          title="Выбор магазина"
          options={marketFilters}
          setOptions={setMarketFilters}
        />
        <OptionsList
          title="Выбор производителя"
          options={brandFilters}
          setOptions={setBrandFilters}
        />
        <GrayButton className={styles.button__apply}>Применить</GrayButton>
        <SocialNetwork vertical={false} className={styles.social} />
      </div>
      <div>
        <Card productsInfos={mockProductInfo} />
      </div>
    </div>
  );
};

export default Product;
