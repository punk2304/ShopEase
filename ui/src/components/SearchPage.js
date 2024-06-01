import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import Book_Card from './Book_Card';
const BASE_URL = process.env.REACT_APP_BASE_URL
const SearchPage = () => {
  const { searchTerm } = useParams();
  const [PageData, setPageData] = useState(null);
  
  useEffect(() => {
    const getSearchItems = async () => {
      const response = await apiConnector(
        'GET',
        BASE_URL+`search?keyword=${searchTerm}`,
      );

      setPageData(response.data);
      console.log("ye hai response",PageData)
    };
    getSearchItems();
  }, [searchTerm]);


  return (
    <div className='ml-96 mr-96'>
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-1 p-2">
    
      {PageData?.products.map((book, i) => (
       
        <Book_Card key={i} book={book} />
      ))}
    </div>
    </div>
  );
};

export default SearchPage;
