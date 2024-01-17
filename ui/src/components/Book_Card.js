import React from 'react';
import { Link } from 'react-router-dom';

const Book_Card = ({ book, height }) => {
  return (
    <Link to={`/Item/${book._id}`} className="block mb-4">
      <div className="rounded-lg overflow-hidden">
        <img
          src={book?.ImageURLL}
          alt="book thumbnail"
          className={`${height} w-full rounded-xl object-cover`}
        />
      </div>
      <div className="flex flex-col gap-2 px-2 py-3">
        <p className="text-xl text-richblack-5">{book?.BookTitle}</p>
        <p className="text-xl text-richblack-5">Rs. {book?.price}</p>
      </div>
    </Link>
  );
};

export default Book_Card;
