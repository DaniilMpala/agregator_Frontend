import React, { useCallback } from "react";

import styles from "./OptionsList.module.css";

export interface Option {
  label: string;
  value: string;
  checked: boolean;
  description?: string;
}

interface Props {
  title: string;
  options: Array<Option>;
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const OptionsList: React.FC<Props> = ({ title, setOptions, options }) => {
  const handleSelect = useCallback(
    (selectedValue: string) => {
      const newOptions = options.map((option) =>
        selectedValue === option.value
          ? {
              ...option,
              checked: !option.checked,
            }
          : option
      );

      setOptions(newOptions);
    },
    [options, setOptions]
  );

  return (
    <div className={styles["block"]}>
      <h3 className={styles["title"]}>{title}</h3>
      <div className={styles["list"]}>
        {options.map(({ label, description, value, checked }) => (
          <button
            key={value}
            className={styles["option"]}
            onClick={() => handleSelect(value)}
          >
            <input type="checkbox" checked={checked} />
            <span
              title={capitalizeFirstLetter(label)}
              className={styles["option-label"]}
            >
              {capitalizeFirstLetter(label)}
            </span>
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
