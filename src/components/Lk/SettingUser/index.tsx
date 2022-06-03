import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import styles from "./SettingUser.module.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";

const SettingUser: React.FC = () => {

  return (
    <main className={styles.main}>
      <Navbar />
      Настройки
    </main>
  );
};

export default SettingUser;
