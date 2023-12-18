const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
// const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
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
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			otp
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	
		await sendVerificationEmail(this.email, this.otp);

	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;