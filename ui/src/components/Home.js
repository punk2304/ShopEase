import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import GiveRating from './GiveRating'

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const [RatingData, setRatingData] = useState(null);

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const response = await apiConnector(
          'POST',
          'http://localhost:4000/api/v1/myRatings',
          {
            userId,
          }
        );
        setRatingData(response.data);
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };
    getMyReviews();
  }, [userId]); 

  return (
    <>
      {RatingData && RatingData.length > 20 ? (
        <p>yuhu</p>
      ) : (
        <GiveRating/>
      )}
    </>
  );
};

export default Home;
