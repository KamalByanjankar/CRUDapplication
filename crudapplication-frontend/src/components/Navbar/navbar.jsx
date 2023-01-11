import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

function navbar() {
  return (
    <div className="navbar">
        <li>
            <NavLink to="/" className={({isActive}) => (isActive ? "active": "")}>Home</NavLink>
        </li>
        <li>
            <NavLink to="/addEmployee/_add" className={({isActive}) => (isActive ? "active" : "")}>Add Employee</NavLink>
        </li>
    </div>
  )
}

export default navbar