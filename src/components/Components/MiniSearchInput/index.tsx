import React, { FocusEventHandler } from "react";
import styles from "./MiniSearchInput.module.css";
import iconSerach from "./iconSerach.svg";

interface Props {
  textSearch?: string | undefined;
  setTextSearch?: (e: string) => void;
  className?: string;
  placeHolder?: string;
  pixelImagesSearchClass: string
  onFocus?: (e: any) => void
}

const MiniSearchInput: React.FC<Props> = ({
  setTextSearch = () => {},
  onFocus = () => {},
  textSearch,
  className,
  placeHolder = "Поиск",
  pixelImagesSearchClass,
}) => {
  return (
    <div className={styles.bg_images + " " + pixelImagesSearchClass}>
      <input
        onFocus={onFocus}
        className={styles.input + " " + className}
        type="text"
        onChange={(e) => setTextSearch(e.target.value)}
        value={textSearch}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default MiniSearchInput;
