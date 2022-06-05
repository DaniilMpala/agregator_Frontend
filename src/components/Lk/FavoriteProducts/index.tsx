import React, { useContext, useEffect, useState } from "react";

import * as API from "../../../utils/api";
import styles from "./FavoriteProducts.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { AuthContext } from "../../../Contexts/Auth";
import Card from "../../Components/Card";
import useAsyncEffect from "../../../hooks/useAsyncEffect";
import InfiniteScroll from "react-infinite-scroll-component";
import Preloader from "../../Components/Preloader";

const FavoriteProducts: React.FC = () => {
  const navigate = useNavigate();
  const [Auth] = useContext(AuthContext);
  const [products, setProduct] = useState<API$ListItems>([]);
  useAsyncEffect(async () => {
    if (!Auth.auth) {
      navigate(`/lk/auth`);
    }

    loadMoreItem();
  }, []);

  const loadMoreItem = async () => {
    const Items = await API.getDataUserFavoriteProducts({
      skip: products.length,
    });
    setProduct([...products, ...Items]);
  };
  return (
    <main className={styles.main}>
      <Navbar />
      <div>
        <h3 className={styles.title}>Любимые товары</h3>
        <InfiniteScroll
          className={styles.items_list}
          dataLength={products.length}
          next={loadMoreItem}
          hasMore={true}
          loader={<Preloader />}
        >
          {products.map((item: API$ProductInfo[], i: number) => (
            <Card key={i} productsInfos={item} />
          ))}
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default FavoriteProducts;
