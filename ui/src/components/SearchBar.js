import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      navigate(`/search/${searchTerm.replaceAll(' ', '+')}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-md mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
