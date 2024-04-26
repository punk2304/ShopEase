import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropDown';
import SearchBar from './SearchBar';
import '../index.css'; // Import the main CSS file

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link to="/" className="text-black text-2xl font-bold">
            Papyrus
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-black">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-black">About Us</Link>
            </li>
          </ul>
          <SearchBar />
          <div className="flex items-center space-x-4">
            {token === null && (
              <>
                <Link to="/login" className="text-black">Login</Link>
                <Link to="/signup" className="text-black">Signup</Link>
              </>
            )}
            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
