import React from 'react'
import logo from "../../Img/logoPi.png"
import "./NavBar.css"

function NavBar() {
  return (
    <>
    <nav className='containerNav'>
        <span className='containerLogo'>
            <img className='logo' id="logo" height={75} src={logo} alt="logo" />
        </span>
        <ul className='nav-menu'>
            <p className='nav-item'>Inicio</p>
            <p className='nav-item'>Nueva Actividad</p>
            <p className='nav-item'>Galeria</p>
            <p className='nav-item'>About</p>
        </ul>
    </nav>
    </>
  )
}

export default NavBar
