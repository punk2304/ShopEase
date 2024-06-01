const express = require('express');
const {getAllRatingsByUserId, createRating}=require('../controller/RatingsController')
const RatingAndReview = require('../models/RatingAndReview');

router.post('/myRatings',getAllRatingsByUserId);
router.post('/createRating', createRating);


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