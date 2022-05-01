import React, { useState } from "react";
import styles from "./OptionsList.module.css";

export interface IOption {
  label: string;
  value: string;
  description?: string;
  checked: boolean;
}

interface Props {
  title: string;
  onSelect: (selectedOptionValue: string) => void;
  options: Array<IOption>;
}
const capitalizeFirstLetter = (str:string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const OptionsList: React.FC<Props> = ({ title, onSelect, options }) => {
  return (
    <div className={styles["block"]}>
      <h3 className={styles["title"]}>{title}</h3>
      <div className={styles["list"]}>
        {options.map(({ label, description, value, checked }) => (
          <button
            key={value}
            className={styles["option"]}
            onClick={() => onSelect(value)}
          >
            <input type="checkbox" checked={checked} />
            <span title={capitalizeFirstLetter(label)} className={styles["option-label"]}>{capitalizeFirstLetter(label)}</span>
            {description && (
              <span className={styles["option-description"]}>
                {description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionsList;
