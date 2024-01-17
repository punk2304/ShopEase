import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import ProfileDropdown from './ProfileDropDown';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  console.log("hello baby", token);

  return (
    <nav>
      <div>
        <Link to="/">Papyrus</Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <SearchBar/>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div>
        {token === null && (
          <Link to="/login">Login</Link>
        )}
        {token === null && (
          <Link to="/signup">Signup</Link>
        )}
        {token !== null && <ProfileDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
