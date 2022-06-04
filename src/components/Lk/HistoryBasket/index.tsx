import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import styles from "./HistoryBasket.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { AuthContext } from "../../../Contexts/Auth";

const HistoryBasket: React.FC = () => {
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
      HistoryBasket
    </main>
  );
};

export default HistoryBasket;
