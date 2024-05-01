import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import GiveRating from './GiveRating'
import Recommendation from './Recommendation'


const Home = () => {
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("chalo check kare",user);

  if(!user===null){
    console.log("chal ja")
    navigate('./login')
    }

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
  }, []); 

  console.log(RatingData);
  return (
    <>
      {RatingData && RatingData.length > 5 ? (
        <Recommendation/>
      ) : (
        <GiveRating/>
      )}
    </>
  );
};

export default Home;
