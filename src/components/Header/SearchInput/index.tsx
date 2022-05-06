import React from "react";
import styles from './SearchInput.module.css'
import iconSerach from './iconSerach.svg'


const SearchInput: React.FC = () => {
  return (
    <div className={styles.inputForm}>
        <img className={styles.inputForm__icon} src={iconSerach} alt="Поиск в каталоге"/>
        <input id="serachInputHeader" className={styles.inputForm__input} type="text" placeholder="Поиск в каталоге"/>
    </div>
  )
}

export default SearchInput
