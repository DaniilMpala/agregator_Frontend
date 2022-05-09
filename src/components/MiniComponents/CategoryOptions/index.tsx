import React, { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList } from "react-window";
import styles from "./OptionsList.module.css";
// import { Resizable } from "react-resizable";

export interface OptionCategory {
  label: string;
  value: string;
  checked: boolean;
  visible: boolean;
}
interface P {
  index: number;
  style: any;
}

interface Props {
  options: OptionCategory[];
  setOptions: React.Dispatch<React.SetStateAction<OptionCategory[]>>;
  children: React.ReactNode[];
}

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const CategoryOptions: React.FC<Props> = ({
  setOptions,
  options,
  children,
}) => {
  const fnItemCount = () => options.filter((v) => v.visible).length;
  const refOptions = useRef<HTMLDivElement>();
  const [itemCount, setitemCount] = useState<number>();
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

  useEffect(() => {
    setitemCount(fnItemCount());
  }, [fnItemCount]);

  const сolumns = ({ index, style }: P) => {
    let tmpOptions = options.filter((v) => v.visible);
    if (tmpOptions.length <= index) return <div></div>;

    let { label, value, checked }: OptionCategory = tmpOptions[index];

    return (
      <button
        style={{
          left: style.left,
          position: "absolute",
        }}
        key={index}
        className={styles["but"] + " " + (checked && styles["checked"])}
        onClick={() => handleSelect(value)}
        title={capitalizeFirstLetter(label)}
      >
        {capitalizeFirstLetter(label)}
      </button>
    );
  };

  return (
    <div className={styles["block"]}>
      {children[0]}
      <FixedSizeList
        height={50}
        itemCount={itemCount}
        itemSize={250 + 16}
        layout="horizontal"
        width={800}
      >
        {сolumns}
      </FixedSizeList>
      {children[1]}
    </div>
  );
};

export default CategoryOptions;
