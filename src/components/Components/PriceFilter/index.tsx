import React from "react";
import { Slider } from "@material-ui/core";

import styles from "./PriceFilter.module.css";

type Range = [start: number, end: number];

export interface PriceRange {
  selected: Range;
  limits: Range;
}

interface Props {
  rangeValue: PriceRange;
  setRangeValue: (v: PriceRange) => void;
}

const sliderStyle: React.CSSProperties = {
  color: "var(--action)",
  width: "186px",
  left: "5px",
};

const PriceFilter: React.FC<Props> = ({ rangeValue, setRangeValue }) => {
  const changeInput = (e: any, first:boolean) => {
    let number = e.target.value.replace(/[^\d.,]/ig, '')
    
    if(first) rangeValue.selected[0] = number
    else rangeValue.selected[1] = number

    setRangeValue({ ...rangeValue });
  }
  return (
    <div className={styles.filter__price}>
      <span className={styles.filter__price__title}>Цена</span>
      <div className={styles.filter__price__blockFilter}>
        <div className={styles.filter__price__Blockvol}>
          <input onInput={(e) => changeInput(e, true)} value={rangeValue.selected[0] + " ₽"}></input>
          <input onInput={(e) => changeInput(e, false)} value={rangeValue.selected[1] + " ₽"}></input>
        </div>

        <Slider
          min={rangeValue.limits[0]}
          max={rangeValue.limits[1]}
          step={0.01}
          value={rangeValue.selected}
          onChange={(_, newRange) => {
            if (Array.isArray(newRange)) {
              setRangeValue({ ...rangeValue, selected: newRange as Range });
            }
          }}
          className={styles.product__slider}
          style={sliderStyle}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
