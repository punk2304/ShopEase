
const Product = require('../models/product');



const getProducts = async (req, res, next) => {
  try{
  let query = Product;
if(req.query.keyword)
{
 regex = new RegExp(req.query.keyword.replaceAll("+"," "), 'i');

  const keyword = req.query.keyword ? { name: regex } : {};

  query = query.find({ ...keyword });

}


  // Filter
  const queryCopy = { ...req.query };
  const removeFields = ['keyword', 'limit', 'page'];
  removeFields.forEach((el) => delete queryCopy[el]);
  let queryStr = JSON.stringify(queryCopy);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  query = query.find(JSON.parse(queryStr));
 


  const getAllProducts = await query;

  res.status(200).json({
    success: true,
    count: getAllProducts.length,
    products: getAllProducts,
  });
}
catch(error){
  return res.status(401).json({
    success:false,
    message:"Internal Server Error",
    
  })
}
};



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
// New Work

const newProduct= async(req,res,next)=>{
  try{
    req.body.user=req.user.id
  const result =await Product.create(req.body)

  res.status(201).json({
    success:true,
    result
  })
}
catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}

const updateProduct=async(req,res,next)=>{
  try{
  let result=await product.findById(req.params.id)

  if(!result){
    return res.status(404).json({
      success:true,
      message:'Product not found'
    })
  }

  result=await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
    result

  })
}
catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}


const getSingleProducts= async (req, res) => {
  try {
  const id = req.params.id;

    

    const results = await Product.findbyId(id);


    res.json(results);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteProduct= async (req, res) => {
  try {
  const id = req.params.id;

    

    const result = await Product.findbyIdAndDelete(id);
    if(!results){
      
    }

    if(!result){
      return res.status(404).json({
        success:true,
        message:'Product not found'
      })
    }


    res.json(results);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





  

  module.exports={getProducts, filterBooks,getMyRecommendation,newProduct,updateProduct,getSingleProducts,deleteProduct};