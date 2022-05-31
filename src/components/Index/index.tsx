import React, { useEffect, useState } from "react";
import styles from "./Index.module.css";
import bg from "./bg.svg";
import arrow from "./Arrow.svg";
import basket from "./basket.png";
import { useNavigate } from "react-router-dom";
import SocialNetwork from "../Components/SocialNetwork";

import * as API from "../../utils/api";
import Card from "../Components/Card";



const Index: React.FC = () => {
  const [products, setProduct] = useState<API$ListItems>([]);
  const navigate = useNavigate();

  const loadChoiceBuyers = async () => {
    const Items = await API.loadChoiceBuyers();
    setProduct(Items);
  };

  useEffect(() => {
    loadChoiceBuyers();
  }, []);
  return (
    <main>
      <div className={styles.block_main}>
        <p className={styles.title}>Товары по лучшим ценам</p>
        <p className={styles.desc}>
          Мы поможем вам найти самую дешевую цену на товар. Сэкономьте свое
          время и деньги, используя единственное приложение, которое сделает всю
          работу за вас.
        </p>
        <button
          onClick={() => navigate(`/products`)}
          className={styles.main_but}
        >
          Перейти в каталог{" "}
          <img className={styles.main_but_arrow} src={arrow} alt="" />
        </button>
        <SocialNetwork vertical={true} className={styles.social} />
        <img className={styles.main_img} src={bg} alt="" />
      </div>
      <div className={styles.block_desc}>
        <div className={styles.block_desc_right}>
          <h3 className={styles.buyers_choice}>Выбор покупателей</h3>
          <div className={styles.buyers_choice_cards}>
            {products.map((item: API$ProductInfo[], i: number) => (
              <Card key={i} productsInfos={item} />
            ))}
          </div>
        </div>

        <div className={styles.description_block}>
          <div>
            <h3 className={styles.description_title}>
              Мы сделали всю тяжелую работу за вас
            </h3>
            <p className={styles.description}>
              Всего за несколько нажатий вы получите доступ к скидкам в
              ближайших к вам магазинах, в которых в настоящее время проводятся
              акции. Так что попрощайтесь с часами просмотра или ручной проверки
              веб-сайта каждого магазина, чтобы найти скидки.
            </p>
          </div>
          <img src={basket} alt="" />
        </div>
      </div>
    </main>
  );
};

export default Index;
