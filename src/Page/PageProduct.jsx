import "./Style/PageProduct.scss";
import CardItem from "../Components/CardItem";
import { useState, useEffect } from "react";
import Button from "../Components/Button";
var timer;
export default function PageProduct() {
  const [ListItem, setListItem] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Shops, setShops] = useState([]);
  const [paramsSerach, setparamsSearch] = useState({ category: [], shops: [] });

  useEffect(() => {
    fetch("/api/product/getCategory", { method: "POST" })
      .then((r) => r.json())
      .then((res) => setCategory(res));
    fetch("/api/product/getShops", { method: "POST" })
      .then((r) => r.json())
      .then((res) => setShops(res));
    fetch("/api/product/getAllProduct", {
      body: JSON.stringify(paramsSerach),
      method: "POST",
    })
      .then((r) => r.json())
      .then((res) => setListItem(res));
  }, []);
  return (
    <div className="backGround PageProduct">
      <div className="list">
        {ListItem.map((v, i) => (
          <CardItem key={i} data={v} />
        ))}
        {/* {{
          weight: 0.15,
          img:"https://lenta.gcdn.co/globalassets/1/-/16/82/10/246179_2.png?preset=thumbnaillossy-webp",
           title:"Паштет печеночный 365 ДНЕЙ, 150г ", allShops: [{img: "/lenta.png",title:"Лента"},{img: "/lenta.png",title:"Лента"}], symbol: "кг", SymbolPrice: 100, price: 100, oldPrice: 190, discount: "-40", dateDiscount: {
             promoEnd:"9999-12-31T23:59:59Z", promoStart: "2022-02-11T02:00:00Z"}
          }} */}
      </div>
      <div className="fiterButton">
        <div className="search">
          <img src="search.svg" />
          <input
            placeholder="Поиск по товарам"
            onInput={(e) => {
              clearTimeout(timer);
              timer = setTimeout(
                (value) => {
                  setListItem([]);
                  setparamsSearch({ ...paramsSerach, search: e.target.value });
                  fetch("/api/product/getAllProduct", {
                    body: JSON.stringify({
                      ...paramsSerach,
                      search: e.target.value,
                    }),
                    method: "POST",
                  })
                    .then((r) => r.json())
                    .then((res) => setListItem(res));
                },
                500,
                e.target.value
              );
            }}
          />
        </div>
        <Button
          dropdown={true}
          setValue={(value) =>
            setparamsSearch({
              ...paramsSerach,
              sortedBy: value,
            })
          }
        >
          {[
            { html: "Сортировка по цене <img src='bol-men.svg'/>", v: 1 },
            { html: "Сортировка по цене <img src='men-bol.svg'/>", v: 2 },
            { html: "Сортировка по спросу", v: 3 },
          ]}
        </Button>
      </div>
      <div className="filter">
        <div>
          <span className="spanCat">Выбор категории</span>
          {Category.map((name, i) => (
            <Button
              className="listCat"
              onClick={(e) => {
                if (~paramsSerach.category.indexOf(e.target.innerText)) {
                  paramsSerach.category.splice(
                    paramsSerach.category.indexOf(e.target.innerText),
                    1
                  );
                  setparamsSearch({
                    ...paramsSerach,
                    category: paramsSerach.category,
                  });
                  e.target.classList.remove("Focused");
                } else {
                  e.target.classList.add("Focused");
                  setparamsSearch({
                    ...paramsSerach,
                    category: paramsSerach?.category
                      ? [...paramsSerach.category, e.target.innerText]
                      : [e.target.innerText],
                  });
                }
              }}
              key={i}
              style={{
                display: "block",
              }}
            >
              {name.title}
            </Button>
          ))}
        </div>

        <div>
          <span className="spanCat">Выбор магазина</span>
          {Shops.map((name, i) => (
            <Button
              className="listCat"
              onClick={(e) => {
                console.log(e.target.innerText);
                if (~paramsSerach.shops.indexOf(e.target.innerText)) {
                  paramsSerach.shops.splice(
                    paramsSerach.shops.indexOf(e.target.innerText),
                    1
                  );
                  setparamsSearch({
                    ...paramsSerach,
                    shops: paramsSerach.shops,
                  });
                  e.target.classList.remove("Focused");
                } else {
                  e.target.classList.add("Focused");
                  setparamsSearch({
                    ...paramsSerach,
                    shops: paramsSerach?.shops
                      ? [...paramsSerach.shops, e.target.innerText]
                      : [e.target.innerText],
                  });
                }
              }}
              key={i}
              style={{
                display: "block",
              }}
            >
              {name.title}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => {
            setListItem([]);
            fetch("/api/product/getAllProduct", {
              body: JSON.stringify(paramsSerach),
              method: "POST",
            })
              .then((r) => r.json())
              .then((res) => setListItem(res));
          }}
          className={"searchButton"}
        >
          Поиск
        </Button>
      </div>
    </div>
  );
}
