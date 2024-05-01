const book = require('../models/Book')
const user = require('../models/User')
const RatingAndReview=require('../models/RatingAndReview')
const axios = require('axios');



const search= async (req, res) => {
  try {
  const {searchTerm} = req.body;

    const regex = new RegExp(searchTerm.replaceAll("+"," "), 'i');
console.log(searchTerm);
    const results = await book.find({ title: regex }).limit(15);


    res.json(results);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// const getMyRecommendation= async (req, res) => {
//   try {
//       const { user_id } = req.body;

//       const userReviews = await RatingAndReview.find({ user: user_id });
//       const reviewedBookIds = userReviews.map(review => review.book);
//       const reviewedBooks = await Book.find({ _id: { $in: reviewedBookIds } });
//       const parentAsins = reviewedBooks.map(book => book.parent_asin);
//       const user_input=parentAsins
//       console.log(user_input)


//       // Making a POST request to the Flask server
//       console.log(user_input[0])
//       const flaskResponse = await axios.post('http://127.0.0.1:5000/recommend_books', {
//           user_input: user_input[0]
//       });

//       // Extracting recommended books from the Flask server response
//       // console.log()
//       const recommendedBooks = flaskResponse.data;

//       res.json({ recommendedBooks });
//   } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
const getMyRecommendation = async (req, res) => {
  try {
    const { userId } = req.body;

    const founduser = await user.findById(userId);

    if (!founduser) {
        return res.status(404).json({ error: 'User not found' });
    }

    const genres = founduser.myFavCategories;

    
    
    // Check if genres is an array
    if (!Array.isArray(genres)) {
      return res.status(400).json({ error: 'Genres must be an array' });
    }

    // Query MongoDB to find books with matching categories (genres)
    const books = await book.find({ categories: { $elemMatch: { $in: genres } } }).limit(100);
    const remainingBooks = books.slice(50);
  //   console.log('Filtered books:', books); // Log filtered books
console.log("ef",books)
    res.json(remainingBooks); // Send filtered books in response
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


  


const filterBooks = async (req, res) => {
    try {
      const { userId } = req.body;

      const founduser = await user.findById(userId);

      if (!founduser) {
          return res.status(404).json({ error: 'User not found' });
      }

      const genres = founduser.myFavCategories;

      console.log("Array received:", genres); // Log received array
      
      // Check if genres is an array
      if (!Array.isArray(genres)) {
        return res.status(400).json({ error: 'Genres must be an array' });
      }
  
      // Query MongoDB to find books with matching categories (genres)
      const books = await book.find({ categories: { $elemMatch: { $in: genres } } }).limit(50);
    //   console.log('Filtered books:', books); // Log filtered books
  
      res.json(books); // Send filtered books in response
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  

  module.exports={search, filterBooks,getMyRecommendation};