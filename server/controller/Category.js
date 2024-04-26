const User = require('../models/User');

const updateFavoriteCategories = async (req, res) => {
    try {
        // Find the user by userId
        const {userId,selectedGenres}=req.body;
       console.log("hum yha hai",selectedGenres)

        const user = await User.findById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Update the user's favorite categories
        user.myFavCategories = selectedGenres;

        // Save the updated user
       const results= await user.save();
        res.json(results);

        return { success: true, message: "Favorite categories updated successfully" };
    } catch (error) {
        console.error("Error updating favorite categories:", error);
        return { success: false, message: "An error occurred while updating favorite categories" };
    }
};

module.exports = {
    updateFavoriteCategories
};
