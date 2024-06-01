const Profile = require("../models/Profile");
const User = require("../models/user");



exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", gender = "", contactNumber } = req.body;
		console.log("req body",req.body);
		const id = req.body.user._id;
		console.log("user",req.user, "id", id);

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.gender = gender;
		profile.contactNumber = contactNumber;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};



// module.exports = {updateProfile};