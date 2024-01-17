// components/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
    const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {

      navigate(`/search/${searchTerm.replaceAll(" ","+")}`);
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
