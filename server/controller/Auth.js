const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {OTP, sendVerificationEmail} = require('../models/OTP');
const {generateOTP}=require('../utils/otpGenerator');
const Profile=require('../models/Profile');
const jwt = require("jsonwebtoken");
const otpSignUp = require("../templates/otpSignUp");
const otpChangePassword = require("../templates/otpChangePassword");
require("dotenv").config();


// OTP controller
const OTPsender=async (req, res) => {
  const {email} = req.body;

  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    let otp=generateOTP();
    let result = await OTP.findOne({ otp: otp });

    while(result){
        otp=generateOTP();
        result = await OTP.findOne({ otp: otp });
    }

    // Create a new OTP document
    const newOTP = new OTP({
      email,
      otp,
    });

	
    await newOTP.save();
	await sendVerificationEmail(email, otp, otpSignUp);	
	
	console.log("New document saved to database");

    res.json({
      success: true,
      message: 'otp sent',
      user: {
      
        email
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const signUp = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};




const login = async(req, res) =>{
	try{
		  	const {email, password} = req.body;
  
		  	// Check if email or password is missing
		  	if (!email || !password) {
		  
				// Return 400 Bad Request status code with error message
				return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
				});
		 	}
  
			// Find user with provided email
			const user = await User.findOne({ email });
  
			// If user not found with provided email
			if (!user) {
				// Return 401 Unauthorized status code with error message
				return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
				});
		 	}
		  	else{
				// Hash the password
				// const checkhashedPassword = await bcrypt.hash(password, 10);
				
				if( !(await bcrypt.compare(password, user.password)) )
				{
					return res.status(401).json({
						success: false,
						message: `Password entered for the User is incorrect, Please tryy again`
						// correctPassword: user.hashedPassword	
					});
				}
				else{

					//generate AWT, after password matching
					const payload = {
						email: user.email,
						id: user._id,
						accountType: user.accountType
					}

					const token = jwt.sign(payload, process.env.JWT_SECRET, {
						expiresIn: "2h"
					});
					user.token = token;
					user.password = undefined;

					//create cookie and send response
					const options = {
						expiresIn: new Date(Date.now() + 2*60*60*1000),
						httpOnly: true
					}

					res.cookie("token", token, options).status(200).json({
						success: true,
						token,
						user,
						message: "User logged in successfully",
					});
				}
	  
		  	}
		}
		catch (error) {
			console.error(error);
			// Return 500 Internal Server Error status code with error message
			return res.status(500).json({
				success: false,
				message: `Login Failure Please Try Again`,
			});
		}
};


const changePassword = async(req, res) =>{

	try{
		const {email} = req.body;

		// Check if email is missing
		if (!email) {
		
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
			success: false,
			message: `Please Fill up the EMAIL ID`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email });
  
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
			success: false,
			message: `User is not Registered with Us Please SignUp to Continue`,
			});
		 }
		 else{
			let otp=generateOTP();
			let result = await OTP.findOne({ otp: otp });
		
			while(result){
				otp=generateOTP();
				result = await OTP.findOne({ otp: otp });
			}
		
			// Create a new OTP document
			const newOTP = new OTP({
			  email,
			  otp,
			});
		
			
			await newOTP.save();
			await sendVerificationEmail(email, otp, otpChangePassword);	
			
			console.log("New document saved to database");
		
			res.json({
			  success: true,
			  message: 'otp sent',
			  user: {
			  
				email
			  },
			});
		 }
	}
	catch(error){
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while sending change password OTP:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while sending change password OTP",
			error: error.message,
		});
	}
}



const verifyOTP = async(req, res) =>{

	try{
		const {email, otp, newPassword} = req.body;

		if (!email || !newPassword || !otp) {
		  
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
			success: false,
			message: `Please Fill up All the Required Fields`,
			});
		 }		

		 // Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}
		else if(otp == response[0].otp) {
			// Find user with provided email
			const user = await User.findOne({ email });

			// Update password
			const encryptedPassword = await bcrypt.hash(newPassword, 10);
			const updatedUserDetails = await User.findByIdAndUpdate(
				user.id,
				{ password: encryptedPassword }
			);
  
			// Return success response
			return res.status(200).json({ 
				success: true, message: "Password updated successfully"
			});
		}
	}
	catch(error){
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}




module.exports = {OTPsender, signUp, login, changePassword, verifyOTP};

