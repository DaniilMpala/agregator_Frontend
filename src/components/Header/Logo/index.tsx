import React from "react";
import styles from './Logo.module.css'
import logoIcon from './logo-icon.svg'
import classNames from "classnames";

const logoTextStyle = classNames({
  [styles.logo__text]: true,
  [styles['logo__text--green']]: true,
})

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
        <img className={styles.logo__image} src={logoIcon} alt='logo'/>
        <span className={logoTextStyle}>Easy</span>
        <span className={styles.logo__text}>Discounts</span>
    </div>
  )
}

export default Logo
