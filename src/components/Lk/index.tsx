import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import * as API from "../../utils/api";
import Auth from "./Auth";
import styles from "./Lk.module.css";

const Lk: React.FC = () => {
  const [dataAuth, setDataAuth] = useState<API$AuthData>(localStorage?.accessToken && jwt_decode(localStorage?.accessToken))
  console.log(dataAuth)
  return (
    <main className={styles.main}>
      {!dataAuth || new Date(dataAuth?.exp || 0) < new Date() 
      ? <Auth setDataAuth={setDataAuth}/> 
      : <p>Вошел</p>}
    </main>
  );
};

export default Lk;
