const book =require('../models/Book')

const search= async (req, res) => {
  try {
  const   {searchTerm} = req.body;

    const regex = new RegExp(searchTerm.replaceAll("+"," "), 'i');

    const results = await book.find({ BookTitle: regex }).limit(50);


    res.json(results);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  module.exports={search};