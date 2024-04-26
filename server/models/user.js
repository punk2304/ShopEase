// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		UsersId: {
            type: Number,
        },
        Location:{
            type:String
        },
        Age:{
            type:Number
        },
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: true,
		},
		// Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
		accountType: {
			type: String,
			enum: ["Customer", "Seller"],
			required: true,
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		books: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Books",
			},
		],
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
		coldstart:{
			type:Boolean,
			default:true
		},
		ratings:[
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "RatingAndReview",
			}
		],
		myFavCategories:[
			{
				type:String,
			}
		],
		
	

	
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);