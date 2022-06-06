import React, {useState } from "react";
import Logo from "../Components/Logo";
import Navbar from "./Navbar";

import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import MiniSearchInput from "../Components/MiniSearchInput";
import { getUrlParams, replaceUri } from "../../global/functions";


const Header: React.FC = () => {
  // const headerRef = useRef() as unknown as React.MutableRefObject<HTMLElement>
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    String(getUrlParams()["search"] || "")
  );

  // const scrollHandler = (e: any) => {
  //   console.log(e);
  //   // const bcr = headerRef.current.getBoundingClientRect()
  //   // console.log(bcr)
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", scrollHandler, false);
  //   return () => window.addEventListener("scroll", scrollHandler, false);
  // }, []);

  const updateSerachText = (e: any) => {
    replaceUri("search", e ? [e] : []);
    setSearchText(e);
    if (!~window.location.href.indexOf("products"))
      navigate(`/products?search=${e}`);
  };
  //ref={headerRef}
  return (
    <header>
      <Logo />
      {/* Добавить посдказу, проценты писать 3.2% (4%), вес в виде: 30 гр, 30 л, 30 кг, 30 мл*/}
      <MiniSearchInput
        setTextSearch={updateSerachText}
        textSearch={searchText}
        pixelImagesSearchClass={styles.Header_input__pixelImages}
        className={styles.Header_input}
        placeHolder="Поиск в продуктах"
      />
      <Navbar />
      
    </header>
  );
};

export default Header;
