import React from "react";
import styles from "./MiniSearchInput.module.css";
import iconSerach from './iconSerach.svg'

interface Props {
  textSearch: string | undefined;
  setTextSearch: (e: string) => void;
  className?: string
}

const MiniSearchInput: React.FC<Props> = ({ setTextSearch, textSearch, className }) => {
  return (
    <div className={styles.inputForm + " " + className}>
      <img
        className={styles.inputForm__icon}
        src={iconSerach}
        alt="Поиск в каталоге"
      />
      <input
        className={styles.inputForm__input}
        type="text"
        onChange={(e) => setTextSearch(e.target.value)}
        value={textSearch}
        placeholder="Поиск"
      />
    </div>
  );
};

export default MiniSearchInput;
