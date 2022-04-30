import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";

import {
  product,
  initialState,
  productReducer,
} from "./Contexts/productReducer";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  useEffect(() => {
    console.log(product)
  }, [state])
  return (
    <div className="App">
      <BrowserRouter>
        <product.Provider value={{ dispatch, state }}>
          <Header />
          <Routes>
            <Route path="/" element={<p>Главная</p>} />
            <Route path="products" element={<Product />} />
            <Route path="pharmacies" element={<p>pharmacies</p>} />
          </Routes>
        </product.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
