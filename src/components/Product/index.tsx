import React, { useContext, useEffect, useState } from "react";

import * as API from "../../utils/api";
import { useAsyncEffect } from "../../hooks";
import Card from "../MiniComponents/Card";
import PriceFilter, { PriceRange } from "../MiniComponents/PriceFilter";
import OptionsList, { Option } from "../MiniComponents/OptionsList";
import GrayButton from "../MiniComponents/GrayButton";
import SocialNetwork from "../MiniComponents/SocialNetwork";
import styles from "./Product.module.css";
import MiniSearchInput from "../MiniComponents/MiniSearchInput";
import { getUrlParams, replaceUri } from "../../global/functions";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [products, setProduct] = useState<API$ReceivedProductsInfoList>({});
  const [marketFilters, setMarketFilters] = useState<Option[]>([]);
  const [brandFilters, setBrandFilters] = useState<Option[]>([]);
  const [TextSearchBrandFilters, setTextSearchBrandFilters] =
    useState<string>();
  const [rangeValue, setRangeValue] = useState<PriceRange>({
    selected: [0, 100],
    limits: [0, 100],
  });
  // (document.getElementById("serachInputHeader") as HTMLInputElement)?.value)

  useEffect(() => {
    let marketSelected = marketFilters
      .filter((v) => v.checked)
      .map((v) => v.value);
    replaceUri("shops", marketSelected.join(","));
  }, [marketFilters]);

  useEffect(() => {
    let brandSelected = brandFilters
      .filter((v) => v.checked)
      .map((v) => v.value);
    replaceUri("brand", brandSelected.join(","));
  }, [brandFilters]);

  useEffect(() => {
    replaceUri("price", rangeValue.selected.join(","));
  }, [rangeValue]);

  useAsyncEffect(async () => {
    loadItem(); //Загрузка всех айтемов

    const { shops, brand, minPrice, maxPrice } = await API.getFilters();

    setMarketFilters(shops.map(filterMapper));
    setBrandFilters(brand.map(filterMapper));
    setRangeValue({
      selected: [minPrice, maxPrice],
      limits: [minPrice, maxPrice],
    });
  }, []);

  const loadMoreItem = () => {
    console.log("Load more");
  };

  const loadItem = async () => {
    // if (sortedBy) requestOption["sortedBy"] = sortedBy
    // if (skip) requestOption["skip"] = skip
    // if (category) requestOption["category"] = category
    let requestOption: API$FilterRequestLoadItem = getUrlParams();

    const Items = await API.loadItem(requestOption);

    setProduct(Items);
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
        {Object.keys(products).map((v, i) => (
          <div className={styles.items}>
            <h2 className={styles.items__title}>{v}</h2>
            <InfiniteScroll
              className={styles.items__list}
              dataLength={products[v].length}
              next={loadMoreItem}
              hasMore={true}
              height="500px"
              loader={<h4>Loading...</h4>}
            >
              {products[v].map((item: API$ProductInfo[]) => (
                <>
                  <Card productsInfos={item} />
                </>
              ))}
            </InfiniteScroll>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
