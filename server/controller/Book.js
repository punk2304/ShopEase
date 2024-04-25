const book =require('../models/Book')

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

  module.exports={search};