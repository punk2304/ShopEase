// const mongoose = require("mongoose");

// Define the Courses schema
// const coursesSchema = new mongoose.Schema({
     
// 		BookId:{type:String},
// 	BookTitle: { type: String },
// 	BookDiscription:{type:String},
// 	BookAuthor:{
// 		type:Number
// 	},
// 	YearOfPublication:{
// 		type:String
// 	},
// 	Publisher:{
// 		type:String
// 	},
// 	ImageURLS:{
// 		type:String
// 	},
// 	ImageURLM:{
// 		type:String
// 	},
// 	ImageURLL:{
// 		type:String
// 	},

// 	seller: [{
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: true,
// 		ref: "user",
// 	}],
	
// 	ratingAndReviews: [
// 		{
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "RatingAndReview",
// 		},
// 	],
// 	price: {
// 		type: Number,
// 		default: Math.floor(Math.random() * (2000 - 50 + 1)) + 50,
// 	},
// 	tag: {
// 		type: [String],
// 	},
// 	category: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		// required: true,
// 		ref: "Category",
// 	},
// 	usersBrought: [
// 		{
// 			type: mongoose.Schema.Types.ObjectId,
// 			required: true,
// 			ref: "user",
// 		},
// 	],
// 	status: {
// 		type: String,
// 		enum: ["Draft", "Published"],
// 	},
// 	createdAt: {
// 		type:Date,
// 		default:Date.now
// 	},
// });

// // Export the Courses model




// module.exports = mongoose.model("book", coursesSchema);






const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  main_category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  average_rating: {
    type: Number,
    required: true
  },
  rating_number: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    required: true
  },
  description: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [{
      url: String,
      variant: String // thumb, large, hi_res
    }],
    required: true
  },
  videos: {
    type: [{
      title: String,
      url: String
    }]
  },
  store: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  details: {
    type: Map,
    of: String
  },
  parent_asin: {
    type: String,
    required: true
  },
  bought_together: {
    type: [String]
  }
});

module.exports = mongoose.model("book", productSchema);


