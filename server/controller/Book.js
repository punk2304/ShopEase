const book = require('../models/Book')
const user = require('../models/User')

const search= async (req, res) => {
  try {
  const   {searchTerm} = req.body;

    const regex = new RegExp(searchTerm.replaceAll("+"," "), 'i');
console.log(searchTerm);
    const results = await book.find({ title: regex }).limit(15);


    res.json(results);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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


  

  module.exports={search, filterBooks};