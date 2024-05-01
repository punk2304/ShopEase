import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from '../services/apiconnector';

function CourseDetails() {
  const { Itemid } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await apiConnector(
          'POST',
          'http://localhost:4000/api/v1/BookDetails',
          { Itemid }
        );
        setBookDetails(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [Itemid]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  const {
    title,
    average_rating,
    rating_number,
    description,
    price,
    images,
    store,
    categories,
    details
  } = bookDetails;

  return (
    <div className="container mx-auto flex mt-6 ml-72 w-2/3">
      <div className="w-1/4">
        {/* Render images */}
        <div className="flex flex-col">
          {images.map((image, index) => (
            <img key={index} src={images[0]?.large} alt={`Image ${index + 1}`} className="mb-2" />
          ))}
        </div>
      </div>
      <div className="w-3/4 px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p>Average Rating: {average_rating}</p>
        <p>Rating Number: {rating_number}</p>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Store: {store}</p>
        <p>Categories: {categories.join(', ')}</p>
        {/* Render details */}
        <div>
          <h2 className="text-2xl font-semibold">Details</h2>
          <ul>
            {Object.entries(details).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
        {/* Buy button */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;
