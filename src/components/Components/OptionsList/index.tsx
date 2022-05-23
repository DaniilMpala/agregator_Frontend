import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import styles from "./OptionsList.module.css";

export interface Option {
  label: string;
  value: string;
  checked: boolean;
  description?: string;
  visible: boolean;
}

interface Props {
  title: string;
  options: Array<Option>;
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  children?: React.ReactNode;
}

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const OptionsList: React.FC<Props> = ({
  title,
  setOptions,
  options,
  children,
}) => {
  const removeSelectAdd = () => {
    const newOptions = options.map((option) => ({
      ...option,
      checked: false,
    }));
    setOptions(newOptions);
  };
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
      {children}
      {options.find((v) => v.checked) && (
        <button className={styles["option"]} onClick={removeSelectAdd}>
          <input type="checkbox" defaultChecked={true} />
          <span className={styles["option-label"]}>Убрать выбранные</span>
        </button>
      )}
      {/* (?) VM2105 react_devtools_backend.js:3973 react-virtuoso: Zero-sized element, this should not happen Object в консоли выводится чето ему не нравится но я хз но кст не всегда хз */}
      <Virtuoso
        className={styles["list"]}
        data={options}
        itemContent={(
          i,
          { label, description, value, checked, visible }: Option
        ) =>
          visible && (
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
          )
        }
      />
    </div>
  );
};

export default OptionsList;
