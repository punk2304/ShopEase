import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropDown';
import SearchBar from './SearchBar';
import '../index.css'; // Import the main CSS file

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  console.log('hello baby', token);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-xl font-bold">Papyrus</Link>
      </div>
      <div className="flex space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">Home</Link>
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <Link to="/about" className="text-white">About Us</Link>
          </li>
        </ul>
      </div>
      <div>
        {token === null && <Link to="/login" className="text-white">Login</Link>}
        {token === null && <Link to="/signup" className="text-white">Signup</Link>}
        {token !== null && <ProfileDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
