const RatingAndReview = require('../models/RatingAndReview');

// Controller function to fetch all ratings of a particular user
async function getAllRatingsByUserId(req, res) {
    const {userId} = req.body; // Assuming userId is passed in the request parameters

    try {
        // Find all ratings associated with the given userId
        const ratings = await RatingAndReview.find({ user: userId }).populate('book');
        
        if (!ratings) {
            return res.status(404).json({ message: 'No ratings found for the user' });
        }

        res.json(ratings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getAllRatingsByUserId,
};
