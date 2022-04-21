import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<p>Главная</p>}/>
          <Route path="products" element={<p>catalog</p>}/>
          <Route path="pharmacies" element={<p>pharmacies</p>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
