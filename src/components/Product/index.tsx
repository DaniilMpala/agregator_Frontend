import React, { useState } from "react";

import * as API from "../../utils/api";
import { useAsyncEffect } from "../../hooks";
import Card from "../MiniComponents/Card";
import PriceFilter, { PriceRange } from "../MiniComponents/PriceFilter";
import OptionsList, { Option } from "../MiniComponents/OptionsList";
import GrayButton from "../MiniComponents/GrayButton";
import SocialNetwork from "../MiniComponents/SocialNetwork";
import styles from "./Product.module.css";
import MiniSearchInput from "../MiniComponents/MiniSearchInput";

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
  desc
    ? {
        value: v,
        label: v,
        checked: false,
        description: desc,
        visible: true,
      }
    : {
        value: v,
        label: v,
        checked: false,
        visible: true,
      };

const Product: React.FC = () => {
  const [marketFilters, setMarketFilters] = useState<Option[]>([]);
  const [brandFilters, setBrandFilters] = useState<Option[]>([]);
  const [TextSearchBrandFilters, setTextSearchBrandFilters] =
    useState<string>();
  const [rangeValue, setRangeValue] = useState<PriceRange>({
    selected: [0, 100],
    limits: [0, 100],
  });
  // (document.getElementById("serachInputHeader") as HTMLInputElement)?.value)
  useAsyncEffect(async () => {
    const { shops, brand, minPrice, maxPrice } = await API.getFilters();

    setMarketFilters(shops.map(filterMapper));
    setBrandFilters(brand.map(filterMapper));
    setRangeValue({
      selected: [minPrice, maxPrice],
      limits: [minPrice, maxPrice],
    });
  }, []);

  const loadItem = async () => {
    let requestOption: API$FilterRequestLoadItem = {};
    let searchText = (
      document.getElementById("serachInputHeader") as HTMLInputElement
    ).value;
    let brandSelected = brandFilters
      .filter((v) => v.checked)
      .map((v) => v.value);
    let marketSelected = marketFilters
      .filter((v) => v.checked)
      .map((v) => v.value);

    if (searchText) requestOption["search"] = searchText;
    if (brandSelected.length > 0) requestOption["brand"] = brandSelected;
    if (marketSelected.length > 0) requestOption["shops"] = marketSelected;
    // if (sortedBy) requestOption["sortedBy"] = sortedBy
    // if (skip) requestOption["skip"] = skip
    // if (category) requestOption["category"] = category

    requestOption["price"] = rangeValue.selected;

    const Items = await API.loadItem(requestOption);
    console.log(Items);
  };

  const updateOptionsBrandFilter = (searchText: string) => {
    setBrandFilters([
      ...brandFilters.map((item: Option) =>
        ~item.label.toLowerCase().indexOf(searchText.toLowerCase())
          ? { ...item, visible: true }
          : { ...item, visible: false }
      ),
    ]);
    setTextSearchBrandFilters(searchText);
  };

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
        >
          <MiniSearchInput
            className={styles.mini__search__input}
            setTextSearch={updateOptionsBrandFilter}
            textSearch={TextSearchBrandFilters}
          />
        </OptionsList>
        <GrayButton onClick={loadItem} className={styles.button__apply}>
          Применить
        </GrayButton>
        <SocialNetwork vertical={false} className={styles.social} />
      </div>
      <div>
        <Card productsInfos={mockProductInfo} />
      </div>
    </div>
  );
};

export default Product;
