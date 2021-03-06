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
import CategoryOptions, {
  OptionCategory,
} from "../MiniComponents/CategoryOptions";
import DropDown, { OptionSortedBy } from "../MiniComponents/DropDown";

const filterMapper = ({ v, desc, label }: API$Filter): Option =>
  desc
    ? {
        value: v,
        label: label ? label : v,
        checked: false,
        description: desc,
        visible: true,
      }
    : {
        value: v,
        label: label ? label : v,
        checked: false,
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
    let categorySelected = categoryFilters
      .filter((v) => v.checked)
      .map((v) => v.value);
    replaceUri("category", categorySelected.join(","));
  }, [categoryFilters]);

  useEffect(() => {
    let sortedBySelected = sortedBy
      .filter((v) => v.checked)
      .map((v) => v.value);
    replaceUri("sortedBy", sortedBySelected.join(","));
  }, [sortedBy]);

  useEffect(() => {
    replaceUri("price", rangeValue.selected.join(","));
  }, [rangeValue]);

  useAsyncEffect(async () => {
    loadItem(); //???????????????? ???????? ??????????????

    const { shops, brand, minPrice, maxPrice, category, sortedBy } =
      await API.getFilters();

    setSortedBy(sortedBy.map(filterMapper))
    setCategoryFilters(category.map(filterMapper));
    setMarketFilters(shops.map(filterMapper));
    setBrandFilters(brand.map(filterMapper));
    setRangeValue({
      selected: [minPrice, maxPrice],
      limits: [minPrice, maxPrice],
    });
  }, []);

  const loadMoreItem = async (shop: string) => {
    let requestOption: API$FilterRequestLoadItem = getUrlParams();

    requestOption["shops"] = [shop];
    requestOption["skip"] = products[shop].length; // 24 ?????????? ??????????????

    const Items = await API.loadItem(requestOption);

    if(Items[shop].length === 0){
      console.log("?????????? ????????????")
    }

    setProduct({ ...products, [shop]: [...products[shop], ...Items[shop]] });
  };

  const loadItem = async () => {
    setProduct({})
    let requestOption: API$FilterRequestLoadItem = getUrlParams();

    const Items = await API.loadItem(requestOption);

    setProduct(Items);
  };

  const updateOptionsBrandFilter = (searchText: string) => {
    setBrandFilters([
      ...brandFilters.map((item: Option) =>
        ~item.label.toLowerCase().indexOf(searchText.toLowerCase()) //?????????? ????????????????
          ? { ...item, visible: true }
          : { ...item, visible: false }
      ),
    ]);
    setTextSearchBrandFilters(searchText);
  };
  const updateOptionsCategoryFilters = (searchText: string) => {
    setCategoryFilters([
      ...categoryFilters.map((item: Option) =>
        ~item.label.toLowerCase().indexOf(searchText.toLowerCase()) //?????????? ????????????????
          ? { ...item, visible: true }
          : { ...item, visible: false }
      ),
    ]);
    setTextSearchCategoryFilters(searchText);
  };

  return (
    <div className={styles.product}>
      <div>
        <PriceFilter rangeValue={rangeValue} setRangeValue={setRangeValue} />
        <OptionsList
          title="?????????? ????????????????"
          options={marketFilters}
          setOptions={setMarketFilters}
        />
        <OptionsList
          title="?????????? ??????????????????????????"
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
          ??????????????????
        </GrayButton>
        <SocialNetwork vertical={false} className={styles.social} />
      </div>
      <div>
        {Object.keys(products).map((v, i) => (
          <div className={styles.items}>
            <h2 className={styles.items__title}>{v}</h2>
            <CategoryOptions
              options={categoryFilters}
              setOptions={setCategoryFilters}
            >
              <MiniSearchInput
                className={styles.category__filters}
                setTextSearch={updateOptionsCategoryFilters}
                textSearch={TextSearchCategoryFilters}
                placeHolder="?????????? ?? ????????????????????"
              />
              <DropDown
                options={sortedBy}
                setOptions={setSortedBy}
              />
            </CategoryOptions>
            <InfiniteScroll
              className={styles.items__list}
              dataLength={products[v].length}
              next={() => loadMoreItem(v)}
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
