import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basket from "./components/Components/Basket";

import Header from "./components/Header";
import Index from "./components/Index";
import SettingUser from "./components/Lk/SettingUser";
import FavoriteProducts from "./components/Lk/FavoriteProducts";
import Pharmacies from "./components/Pharmacies";
import Product from "./components/Product";
import { BasketContext, initialState, BasketReducer } from "./Contexts/Basket";
import Auth from "./components/Lk/Auth";

const App: React.FC = () => {
  const [baskettState, basketDispatch] = useReducer(
    BasketReducer,
    initialState
  );

  return (
    <div className="App">
      <BrowserRouter>
        <BasketContext.Provider value={[baskettState, basketDispatch]}>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="products" element={<Product />} />
            <Route path="pharmacies" element={<Pharmacies />} />
            <Route path="lk">
              <Route path="auth" element={<Auth />}/>
              <Route path="favoriteProducts" element={<FavoriteProducts />} />
              <Route path="setting" element={<SettingUser />} />
            </Route>
          </Routes>
          <Basket />
        </BasketContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
