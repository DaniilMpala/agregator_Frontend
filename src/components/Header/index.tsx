
import React, { useEffect } from "react";
import Logo from './Logo'
import SearchInput from './SearchInput'
import Navbar from './Navbar'
import Button from '../MiniComponents/Button'

import './Header.css'

const Header: React.FC = () => {
  useEffect(() => {
    console.log(5)
  });
  return (
    <header>
      <Logo />
      <SearchInput />
      <Navbar />
      <Button>Войти</Button>
    </header>
  )
}

export default Header
