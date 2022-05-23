import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Button from "../Components/Button";

import { useNavigate } from "react-router-dom";

import "./Header.css";
import MiniSearchInput from "../Components/MiniSearchInput";
import { getUrlParams, replaceUri } from "../../global/functions";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    String(getUrlParams()["search"] || "")
  );
  const updateSerachText = (e: any) => {
    replaceUri("search", e ? [e] : []);
    setSearchText(e);
    if (!~window.location.href.indexOf("products")) navigate(`/products?search=${e}`);
  };
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
      <Button>Войти</Button>
    </header>
  );
};

export default Header;
