import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Product from "./components/Product";
// import {
//   ProductContext,
//   initialState,
//   productReducer,
// } from "./Contexts/Сheck";

const App: React.FC = () => {
  // const [productState, productDispatch] = useReducer(
  //   productReducer,
  //   initialState
  // );

  return (
    <div className="App">
      <BrowserRouter>
        {/* <ProductContext.Provider value={[productState, productDispatch]}> */}
          <Header />
          <Routes>
            <Route path="/" element={<p>Главная</p>} />
            <Route path="products" element={<Product />} />
            <Route path="pharmacies" element={<p>pharmacies</p>} />
          </Routes>
        {/* </ProductContext.Provider> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
