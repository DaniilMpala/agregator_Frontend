import React, { useEffect, useState } from "react";
import Logo from "../Components/Logo";
import Navbar from "./Navbar";

import { NavLink, useNavigate } from "react-router-dom";

import "./Header.css";
import MiniSearchInput from "../Components/MiniSearchInput";
import { getUrlParams, replaceUri } from "../../global/functions";

import iconLk from "./iconLk.svg";
import { ReactSVG } from "react-svg";

const Header: React.FC = () => {
  // const headerRef = useRef() as unknown as React.MutableRefObject<HTMLElement>
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    String(getUrlParams()["search"] || "")
  );

  const scrollHandler = (e: any) => {
    console.log(e);
    // const bcr = headerRef.current.getBoundingClientRect()
    // console.log(bcr)
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, false);
    return () => window.addEventListener("scroll", scrollHandler, false);
  }, []);

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
        pixelImagesSearchClass="Header_input__pixelImages"
        className="Header_input"
        placeHolder="Поиск в продуктах"
      />
      <Navbar />
      <NavLink to="lk/auth">
        <ReactSVG
          src={iconLk}
          beforeInjection={(svg: {
            classList: { add: (arg0: string) => void };
          }) => {
            svg.classList.add("header_icon_lk");
          }}
        />
      </NavLink>
    </header>
  );
};

export default Header;
