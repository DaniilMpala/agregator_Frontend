import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basket from "./components/Components/Basket";

import Header from "./components/Header";
import Index from "./components/Index";
import SettingUser from "./components/Lk/SettingUser";
import FavoriteProducts from "./components/Lk/FavoriteProducts";
import Pharmacies from "./components/Pharmacies";
import Product from "./components/Product";
import { BasketContext, initialState, BasketReducer, BasketActionsTypes, BasketState, ProductsBasket } from "./Contexts/Basket";
import AuthComponent from "./components/Lk/Auth";
import HistoryBasket from "./components/Lk/HistoryBasket";
import { AuthActionsTypes, AuthContext, AuthReducer, initialStateAuth } from "./Contexts/Auth";


const App: React.FC = () => {
  const [baskettState, basketDispatch] = useReducer(
    BasketReducer,
    initialState
  );
  const [Auth, AuthDispath] = useReducer(AuthReducer, initialStateAuth);

  useEffect(() => {
    AuthDispath({
      type: AuthActionsTypes.UPDATE_AUTH,
      payload: initialStateAuth,
    });

    let basket :ProductsBasket[] = localStorage.stateBasket && JSON.parse(localStorage.stateBasket)
    basketDispatch({
      type: BasketActionsTypes.LOAD_BASKET,
      payload: basket || [],
    });

    const timer = setInterval(()=>{
      AuthDispath({
        type: AuthActionsTypes.UPDATE_AUTH,
        payload: initialStateAuth,
      });
    }, 1000*60*30)

    return clearInterval(timer)
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={[Auth, AuthDispath]}>
          <BasketContext.Provider value={[baskettState, basketDispatch]}>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="products" element={<Product />} />
              <Route path="pharmacies" element={<Pharmacies />} />
              <Route path="lk">
                <Route path="auth" element={<AuthComponent />} />
                <Route path="favoriteProducts" element={<FavoriteProducts />} />
                <Route path="setting" element={<SettingUser />} />
                <Route path="historyBasket" element={<HistoryBasket />} />
              </Route>
            </Routes>
            <Basket />
          </BasketContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
