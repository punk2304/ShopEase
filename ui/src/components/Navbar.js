// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import ProfileDropdown from './ProfileDropDown';

const Navbar = () => {

  const { token } = useSelector((state) => state.auth)
  console.log("hello baby",token);
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/">Papyrus</Link>
      </div>
      <div className="middle-section">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/catalog">Catalog</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="right-section">
     { token === null && (
        <Link to="/login">Login</Link>
     )
     }
     {token == null && (
        <Link to="/signup">Signup</Link>
     )
     }

     {token !== null && <ProfileDropdown/>}
      </div>
    </nav>
  );
};

export default Navbar;
