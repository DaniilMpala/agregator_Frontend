import React, { useState } from "react";
import styles from "./PriceFilter.module.css";
import { Slider } from "@material-ui/core";

interface Props {
  valueSlider: IPriceSlider
  setValueSlider: (v:IPriceSlider) => void
}
const PriceFilter: React.FC<Props> = ({
  valueSlider,
  setValueSlider = () => {},
}) => {
  return (
    <div className={styles.filter__price}>
      <span className={styles.filter__price__title}>Цена</span>
      <div className={styles.filter__price__blockFilter}>
        <div className={styles.filter__price__Blockvol}>
          <span>{valueSlider.selected[0]} ₽</span>
          <span>{valueSlider.selected[1]} ₽</span>
        </div>

        <Slider
          max={valueSlider.static[1]}
          min={valueSlider.static[0]}
          step={0.01}
          value={valueSlider.selected}
          onChange={(e, data) =>
            typeof data == "object" ? setValueSlider({...valueSlider, selected:data}) : ""
          }
          className={styles.product__slider}
          style={{ color: "var(--action)", width: "186px", left: "5px" }}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
