import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import Book_Card from './Book_Card';

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [PageData, setPageData] = useState(null);

  useEffect(() => {
    const getSearchItems = async () => {
      const response = await apiConnector(
        'POST',
        'http://localhost:4000/api/v1/search',
        {
          searchTerm,
        }
      );

      setPageData(response.data);
    };
    getSearchItems();
  }, [searchTerm]);
 

  return (
    <div className='ml-96 mr-96'>
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-1 p-2">
      {PageData?.map((book, i) => (
       
        <Book_Card key={i} book={book} />
      ))}
    </div>
    </div>
  );
};

export default SearchPage;
