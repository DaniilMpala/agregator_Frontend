import React, { useCallback, useEffect, useState } from "react";
import styles from "./DropDown.module.css";
import dropArrowClose from "./dropArrowClose.svg";
import dropArrowOpen from "./dropArrowOpen.svg";

export interface OptionSortedBy {
  value: string;
  label: string;
  checked: boolean;
}
interface Props {
  options: OptionSortedBy[];
  setOptions: (array: OptionSortedBy[]) => void;
}

const DropDown: React.FC<Props> = ({ setOptions, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      const newOptions = options.map((option) =>
        selectedValue === option.value
          ? {
              ...option,
              checked: !option.checked,
            }
          : {
              ...option,
              checked: false,
            }
      );

      setOptions(newOptions);
    },
    [options, setOptions]
  );
  const clickSelect = (selectedValue: string) => {
    handleSelect(selectedValue);
    openDropDown();
  };
  const openDropDown = () => setIsOpen(!isOpen);

  const findSelected = () => {
    let selectedOption = options.find((v) => v.checked);
    if (selectedOption) return selectedOption.label;
    else return options[0]?.label;
  };

  return (
    <div className={styles["block"]}>
      <button onClick={openDropDown} className={styles["but"]}>
        {findSelected()}
        {!isOpen && <img alt="" src={dropArrowClose} />}
        {isOpen && <img alt="" src={dropArrowOpen} />}
      </button>
      <div className={styles["drop-down"] + " " + (isOpen && styles["active"])}>
        {options.map(
          ({ value, label, checked }) =>
            findSelected() !== label && (
              <button
                key={value}
                onClick={() => clickSelect(value)}
                className={styles["but-drop-down"]}
                value={value}
              >
                {label}
              </button>
            )
        )}
      </div>
    </div>
  );
};

export default DropDown;
