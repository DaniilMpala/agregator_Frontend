import React, { useEffect, useState } from "react";

import * as API from "../../utils/api";
import { useAsyncEffect } from "../../hooks";
import Card from "../Components/Card";
import PriceFilter, { PriceRange } from "../Components/PriceFilter";
import OptionsList, { Option } from "../Components/OptionsList";
import GrayButton from "../Components/GrayButton";
import SocialNetwork from "../Components/SocialNetwork";
import styles from "./Product.module.css";
import MiniSearchInput from "../Components/MiniSearchInput";
import { getUrlParams, replaceUri } from "../../global/functions";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoryOptions, { OptionCategory } from "../Components/CategoryOptions";
import DropDown, { OptionSortedBy } from "../Components/DropDown";
import Preloader from "../Components/Preloader";

const parametrsUrlFilter = getUrlParams();

//ищет совпадение во всех массивах параметра, и если есть совпадение по VALUE то true
const findInUrlParams = (value: string) => {
  for (const key in parametrsUrlFilter) {
    if (parametrsUrlFilter[key].some((v) => v == value)) return true;
  }
  return false;
};

const filterMapper = ({ v, desc, label }: API$Filter): Option =>
  desc
    ? {
        value: v,
        label: label ? label : v,
        checked: findInUrlParams(v),
        description: desc,
        visible: true,
      }
    : {
        value: v,
        label: label ? label : v,
        checked: findInUrlParams(v),
        visible: true,
      };

const Product: React.FC = () => {
  const [products, setProduct] = useState<API$ReceivedProductsInfoList>({});
  const [marketFilters, setMarketFilters] = useState<Option[]>([]);
  const [brandFilters, setBrandFilters] = useState<Option[]>([]);
  const [TextSearchBrandFilters, setTextSearchBrandFilters] =
    useState<string>();
  const [categoryFilters, setCategoryFilters] = useState<OptionCategory[]>([]);
  const [TextSearchCategoryFilters, setTextSearchCategoryFilters] =
    useState<string>();

  const [sortedBy, setSortedBy] = useState<OptionSortedBy[]>([]);

  const [rangeValue, setRangeValue] = useState<PriceRange>({
    selected: [0, 0],
    limits: [0, 0],
  });

  const filteredBySelect = (
    state: Option[] | OptionCategory[] | OptionSortedBy[]
  ) => state.filter((v) => v.checked).map((v) => v.value);

  useEffect(() => {
    if (marketFilters.length > 0)
      replaceUri("shops", filteredBySelect(marketFilters));
  }, [marketFilters]);

  useEffect(() => {
    if (brandFilters.length > 0)
      replaceUri("brand", filteredBySelect(brandFilters));
  }, [brandFilters]);

  useEffect(() => {
    if (categoryFilters.length > 0)
      replaceUri("category", filteredBySelect(categoryFilters));
  }, [categoryFilters]);

  useEffect(() => {
    if (sortedBy.length > 0) replaceUri("sortedBy", filteredBySelect(sortedBy));
  }, [sortedBy]);

  useEffect(() => {
    if (rangeValue.selected[0] > 0) replaceUri("price", rangeValue.selected);
  }, [rangeValue]);

  useAsyncEffect(async () => {
    loadItem(); //Загрузка всех айтемов

    const { shops, brand, minPrice, maxPrice, category, sortedBy } =
      await API.getFilters();

    setSortedBy(sortedBy.map(filterMapper)); //+
    setCategoryFilters(category.map(filterMapper)); //+
    setMarketFilters(shops.map(filterMapper)); //+
    setBrandFilters(brand.map(filterMapper)); //+
    setRangeValue({
      selected: [
        (parametrsUrlFilter?.price &&
          Number(parametrsUrlFilter?.price[0])) ||
          minPrice,
        (parametrsUrlFilter?.price &&
          Number(parametrsUrlFilter?.price[1])) ||
          maxPrice,
      ], //если в поисковой строке уже есть выбранный диапазон то ставим его
      limits: [minPrice, maxPrice],
    });
  }, []);

  const loadMoreItem = async (shop: string) => {
    console.log("loadMoreItem");
    let requestOption: API$FilterRequestLoadItem = getUrlParams();

    requestOption["shops"] = [shop];
    requestOption["skip"] = products[shop].length; // 24 новых айтемов

    const Items = await API.loadItem(requestOption);

    if (Items[shop].length === 0) {
      console.log("Конец списка");
    }

    setProduct({ ...products, [shop]: [...products[shop], ...Items[shop]] });
  };

  const loadItem = async () => {
    setProduct({});
    let requestOption: API$FilterRequestLoadItem = getUrlParams();

    const Items = await API.loadItem(requestOption);

    setProduct(Items);
  };

  const updateOptionsBrandFilter = (searchText: string) => {
    setBrandFilters([
      ...brandFilters.map((item: Option) =>
        ~item.label.toLowerCase().indexOf(searchText.toLowerCase()) ||
        ~item.value.toLowerCase().indexOf(searchText.toLowerCase()) //поиск название и по value
          ? { ...item, visible: true }
          : { ...item, visible: false }
      ),
    ]);
    setTextSearchBrandFilters(searchText);
  };
  const updateOptionsCategoryFilters = (searchText: string) => {
    setCategoryFilters([
      ...categoryFilters.map((item: Option) =>
        ~item.label.toLowerCase().indexOf(searchText.toLowerCase()) //поиск название
          ? { ...item, visible: true }
          : { ...item, visible: false }
      ),
    ]);
    setTextSearchCategoryFilters(searchText);
  };

  const setSortedBySelect = (array: OptionSortedBy[]) => {
    setSortedBy(array);
    setTimeout(() => loadItem(), 400);
    
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
            pixelImagesSearchClass={styles.search__pixel}
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
        {Object.keys(products).length === 0 && <Preloader style={{height: "100%", width: "75vw"}} />}
        {Object.keys(products).map((v, i) => (
          <div className={styles.items}>
            <h2 className={styles.items__title}>{v}</h2>
            <CategoryOptions
              options={categoryFilters}
              setOptions={setCategoryFilters}
            >
              <MiniSearchInput
                pixelImagesSearchClass={styles.item_search__pixel}
                className={styles.category_filters}
                setTextSearch={updateOptionsCategoryFilters}
                textSearch={TextSearchCategoryFilters}
                placeHolder="Поиск в кат."
              />
              <DropDown options={sortedBy} setOptions={setSortedBySelect} />
            </CategoryOptions>
            <InfiniteScroll
              className={styles.items_list}
              dataLength={products[v].length}
              next={() => loadMoreItem(v)}
              hasMore={true}
              height="500px"
              loader={<Preloader />}
            >
              {products[v].map((item: API$ProductInfo[], i) => (
                <Card key={i} productsInfos={item} />
              ))}
            </InfiniteScroll>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
