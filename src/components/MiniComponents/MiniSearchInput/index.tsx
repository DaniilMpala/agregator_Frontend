import React from "react";
import styles from "./MiniSearchInput.module.css";
import iconSerach from "./iconSerach.svg";

interface Props {
  textSearch: string | undefined;
  setTextSearch: (e: string) => void;
  className?: string;
  placeHolder?: string;
}

const MiniSearchInput: React.FC<Props> = ({
  setTextSearch,
  textSearch,
  className,
  placeHolder = "Поиск",
}) => {
  return (
    <input
      className={styles.input + " " + className}
      type="text"
      onChange={(e) => setTextSearch(e.target.value)}
      value={textSearch}
      placeholder={placeHolder}
    />
  );
};

export default MiniSearchInput;
