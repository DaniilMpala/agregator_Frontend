import React, { useEffect } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Button from "../MiniComponents/Button";

import "./Header.css";
import MiniSearchInput from "../MiniComponents/MiniSearchInput";
import { replaceUri } from "../../global/functions";

const Header: React.FC = () => {
  return (
    <header>
      <Logo />
      <MiniSearchInput
        setTextSearch={(e:any) => replaceUri("search", [e])}
        pixelImagesSearchClass="Header_input__pixelImages"
        className="Header_input"
      />
      <Navbar />
      <Button>Войти</Button>
    </header>
  );
};

export default Header;
