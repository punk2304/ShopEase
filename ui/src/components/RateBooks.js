import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import Book_Card from './Book_Card';
import Rating_Card from './Rating_Card';
import {Link,useNavigate} from 'react-router-dom'

function RateBooks() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const [BooksToRate, setBooksToRate] = useState([]);

  useEffect(() => {
    
    const ratingBooks = async () => {
      try {
        const response = await apiConnector(
          'POST',
          'http://localhost:4000/api/v1/filterBooks',
          {
            userId,
          }
        );
        setBooksToRate(response.data);
        // console.log(response);
        // console.log(BooksToRate);
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };
    ratingBooks();
  }, [userId]); 

  const HandleSubmit=(e)=>{


    navigate('/');


  }

  return (
    <div>
    <div>
    <button className='flex' onClick={HandleSubmit}>Submit</button>
    </div>
         <div className='ml-96 mr-96'>
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-1 p-2">
         {BooksToRate && BooksToRate?.map((book) => (
            <Rating_Card book={book} />
            ))}
         </div>
         </div>   
    </div>
  )
}

export default RateBooks
