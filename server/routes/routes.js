// routes.js

const express = require('express');

// const {OTPsender, signUp, login, changePassword, verifyOTP}=require('../controller/Auth');
const { updateProfile } = require('../controller/Profile');
const { imageUpload } = require('../config/cloudinary');
const {OTPsender, signUp, login, changePassword, verifyOTP,hello}=require('../controller/Auth')
const {getAllRatingsByUserId, createRating}=require('../controller/Ratings')
const {updateFavoriteCategories}=require('../controller/Category')
const {search, filterBooks,getMyRecommendation}=require('../controller/Book');

const router = express.Router();

// Route to create a new user
router.post('/OTP', OTPsender);
router.post('/signUp', signUp);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/verifyOTP', verifyOTP);
router.post('/search',search);

router.post('/filterBooks', filterBooks);
router.post('/myRatings',getAllRatingsByUserId);
router.post('/createRating', createRating);
 

router.post('/imageUpload', imageUpload);
router.post('/updateFavCategory', updateFavoriteCategories);
router.post('/myRecommendedBooks',getMyRecommendation);

router.put('/profile/updateProfile', updateProfile);


const RatingAndReview = require('../models/RatingAndReview');
const Book = require('../models/Book');

// Route to get parent_asin of all reviewed books by a user
router.post('/user_reviews', async (req, res) => {
    try {
        const { user_id } = req.body;

        // Find all reviews by the given user
        const userReviews = await RatingAndReview.find({ user: user_id });

        // Extract book ObjectIds from userReviews
        const reviewedBookIds = userReviews.map(review => review.book);

        // Find books with the reviewedBookIds
        const reviewedBooks = await Book.find({ _id: { $in: reviewedBookIds } });

        // Extract parent_asin from reviewedBooks
        const parentAsins = reviewedBooks.map(book => book.parent_asin);

        

        res.json({ parentAsins });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// bookController.js





router.post('/BookDetails', async (req, res) => {
  try {
    const { Itemid } = req.body;
    const bookDetails = await Book.findOne({ _id: Itemid }); // Assuming _id is used for book identification
    if (!bookDetails) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(bookDetails);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


module.exports = router;



module.exports = router;