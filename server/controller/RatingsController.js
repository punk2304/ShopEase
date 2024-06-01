const RatingAndReview = require('../models/RatingAndReview');
const book = require('../models/product');
const user = require('../models/User');

// Controller function to fetch all ratings of a particular user
async function getAllRatingsByUserId(req, res) {
    const {userId} = req.body; // Assuming userId is passed in the request parameters

    try {
        // Find all ratings associated with the given userId
        const ratings = await RatingAndReview.find({ user: userId });
        
        if (!ratings) {
            return res.status(404).json({ message: 'No ratings found for the user' });
        }

        res.json(ratings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function createRating(req, res){
    try{
    const {rating,review} = req.body;
    const userId=req.user.id;
    bookId=req.params,id;
    console.log("checking from param", userId, bookId, rating);
    if(!review)
    {
        review=null; 
    }
    if (!founduser) {
        return res.status(404).json({ error: 'User not found' });
    }
    const founduser = await user.findById(userId);

    founduser.ratings.push(savedRating._id);
   
        const newRating = new RatingAndReview({
            user: userId,
            book: bookId,
            rating,
            review
        });

        // Save the new rating and review to the database
        const savedRating = await newRating.save();

        console.log("rating created");

       
  
        // Save the updated user object
        await founduser.save();

        return res.status(200).json({ 
            success: true,
            message: 'entry done' });        

    }catch(error){
        console.log("unable to create ratings entry to DB");
        console.error('Error creating rating and review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {
    getAllRatingsByUserId, createRating
};
