
import React, { useEffect } from "react";
import Logo from './Logo'
import SearchInput from './SearchInput'
import Navbar from './Navbar'
import Button from '../MiniComponents/Button'

import './Header.css'

const Header: React.FC = () => {
  return (
    <header>
      <Logo />
      <SearchInput />
      <Navbar />
      <Button>Войти в лк</Button>
    </header>
  )
}

export default Header
