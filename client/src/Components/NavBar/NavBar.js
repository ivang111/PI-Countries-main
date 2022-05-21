import React from 'react'
import logo from "../../Img/logoPi.png"
import "./NavBar.css"
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <>
    <nav className='containerNav'>
      <NavLink to='/home'>
        <span className='containerLogo'>
            <img className='logo' id="logo" height={55} src={logo} alt="logo" />
        </span>
      </NavLink>  
      <ul className='nav-menu'>
        <NavLink to='/home'><p className='nav-item'>Inicio</p></NavLink>
        <NavLink to='/activities'><p className='nav-item'>Actividades</p></NavLink>
        <NavLink to='/newActivity'><p className='nav-item'>Nueva Actividad</p></NavLink>
        <NavLink to='/about'><p className='nav-item'>About</p></NavLink>
      </ul>
    </nav>
    </>
  )
}

export default NavBar
