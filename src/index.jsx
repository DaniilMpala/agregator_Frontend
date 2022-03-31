import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import PageProduct from "./Page/PageProduct";
import Main from "./Page/Main";
import Header from "./Components/Header";
import "./index.scss"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/PageProduct" element={<PageProduct />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
