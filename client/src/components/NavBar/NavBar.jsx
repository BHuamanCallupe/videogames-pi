import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import style from "./NavBar.module.css"

const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
      <Link to="/home">Home</Link>
      <Link to="/Form">Create</Link>
      <SearchBar></SearchBar>
    </div>
  )
}

export default NavBar