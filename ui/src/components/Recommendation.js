import React,{useEffect,useState} from 'react'
import { apiConnector } from '../services/apiconnector';
import { useSelector } from 'react-redux';
import Book_Card from './Book_Card';
const BASE_URL = process.env.REACT_APP_BASE_URL

function Recommendation() {
    const [PageData, setPageData] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const userId = user._id;
    

    useEffect(()=>{
        const getMyRecommendation = async () => {
            try {
              const response = await apiConnector(
                'POST',
                BASE_URL+'myRecommendedBooks',
                {
                  userId,
                }
              );
              setPageData(response.data);
            } catch (error) {
              console.error('Error fetching rating data:', error);
            }
          };
          getMyRecommendation();
    },[])

    console.log("khatam karte hai",PageData)

  return (
    <div className='ml-96 mr-96'>
    <div className='flex justify-center mt-7 mb-11 font-bold text-lg'>
    <div className=''>Your Recommended Books are</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-1 p-2">
      {PageData?.map((book, i) => (
       
        <Book_Card key={i} book={book} />
      ))}
    </div>
    </div>
  )
}

export default Recommendation