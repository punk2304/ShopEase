const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSignUp = require("../templates/otpSignUp");

// const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	// Define the email field with type String, required, and trimmed
	email: {
		type: String,
		required: true,
		trim: true,
	},
	
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 40, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp, fun) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			fun, 
			otp
		);
		console.log("Email sent successfully: ", otp , mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


// // Define a post-save hook to send email after the document has been saved
// OTPSchema.pre("save", async function (next) {
// 	console.log("New document saved to database");
	
// 		await sendVerificationEmail(this.email, this.otp);

// 	next();
// });



// // Define a function to send emails for changing password
// async function sendChangePasswordEmail(email, otp) {
// 	// Create a transporter to send emails

// 	// Define the email options

// 	// Send the email
// 	try {
// 		const mailResponse = await mailSender(
// 			email,
// 			"Verification Email",
// 			otpSignUp(otp)
// 		);
// 		console.log("Email sent successfully: ", mailResponse.response);
// 	} catch (error) {
// 		console.log("Error occurred while sending email: ", error);
// 		throw error;
// 	}
// }

// // Define a post-save hook to send email after the document has been saved
// OTPSchema.pre("save", async function (next) {
// 	console.log("New document saved to database");
	
// 		await sendChangePasswordEmail(this.email, this.otp);

// 	next();
// });


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = {OTP, sendVerificationEmail};
// module.exports = sendVerificationEmail;