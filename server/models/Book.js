const mongoose = require("mongoose");

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
     
		BookId:{type:String},
	BookTitle: { type: String },
	BookDiscription:{type:String},
	BookAuthor:{
		type:Number
	},
	YearOfPublication:{
		type:String
	},
	Publisher:{
		type:String
	},
	ImageURLS:{
		type:String
	},
	ImageURLM:{
		type:String
	},
	ImageURLL:{
		type:String
	},

	seller: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	}],
	
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
		default: Math.floor(Math.random() * (2000 - 50 + 1)) + 50,
	},
	tag: {
		type: [String],
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	usersBrought: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("book", coursesSchema);