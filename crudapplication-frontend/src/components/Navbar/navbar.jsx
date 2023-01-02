import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

function navbar() {
  return (
    <div className="navbar">
        <li>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
            <NavLink exact to="/addEmployee" activeClassName="active">Add Employee</NavLink>
        </li>
    </div>
  )
}

export default navbar