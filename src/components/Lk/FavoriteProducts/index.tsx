import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import styles from "./FavoriteProducts.module.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";

const FavoriteProducts: React.FC = () => {

  return (
    <main className={styles.main}>
      <Navbar />
      favoriteProducts
    </main>
  );
};

export default FavoriteProducts;
