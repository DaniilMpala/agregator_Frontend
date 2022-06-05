import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import styles from "./FavoriteShop.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { AuthContext } from "../../../Contexts/Auth";

const FavoriteShop: React.FC = () => {
  const navigate = useNavigate();
  const [Auth] = useContext(AuthContext);

  useEffect(() => {
    if (!Auth.auth) {
      navigate(`/lk/auth`);
    }
  }, []);
  return (
    <main className={styles.main}>
      <Navbar />
      FavoriteShop
    </main>
  );
};

export default FavoriteShop;
