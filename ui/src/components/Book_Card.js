import React, { useEffect, useState } from 'react'


import { Link } from 'react-router-dom';

const Book_Card = ({book, Height}) => {


  return (
    <>
      <Link to={`/Item/${book._id}`}>
        <div className="">
          <div className="round`ed-lg">
            <img
              src={book?.ImageURLL}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{book?.BookTitle}</p>
            
            <div className="flex items-center gap-2">
        
          
            </div>
            <p className="text-xl text-richblack-5">Rs. {book?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Book_Card
