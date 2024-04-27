import React, { useEffect, useState } from 'react';
import StarRating from './StarRating'; // Assuming you have a StarRating component
import { apiConnector } from '../services/apiconnector';
import { useSelector } from 'react-redux';

function Rating_Card({ book }) {

  const [rating, setRating] = useState(0); // State to store the rating
    const bookId = book._id;

    const { user } = useSelector((state) => state.auth);
    const userId = user._id;

  // Handler function to update the rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(book.title , newRating, book._id);
    // You can add logic here to send the rating to your backend or wherever it's needed
  };

  useEffect(() => {
    const ratingBooks = async () => {
      try {
        const response = await apiConnector(
          'POST',
          'http://localhost:4000/api/v1/createRating',
          {
            userId,
            bookId,
            rating
          }
        );
        console.log("createRating called from front end")
        console.log("res of calling createRating", response);
       
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };
    ratingBooks();
  }, [rating]); 

  return (
    <div className="border rounded-lg p-4">
      <div>
        <img
          src={book.images[0]?.large}
          alt="Book Cover"
          className="h-full w-full object-cover mb-2"
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{book.title}</h2>
      </div>
      <div>
        {/* Replace this with your star rating component */}
        <StarRating value={rating} onChange={handleRatingChange} />

      </div>
    </div>
  );
}

export default Rating_Card;
