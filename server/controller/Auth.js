const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const OTP = require('../models/OTP');
const {generateOTP}=require('../utils/otpGenerator')



// Signup route
const Signup=async (req, res) => {
  const { firstName, lastName, email, password, accountType } = req.body;

  try {
    // Check if the user with the provided email already exists
    const existingUser = await OTP.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    let otp=generateOTP();
    let result = await OTP.findOne({ otp: otp });

    while(result){
        otp=generateOTP;
        result = await OTP.findOne({ otp: otp });
    }

    
  

    // Create a new OTP document
    const newOTP = new OTP({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      otp,
      
    });

    // Save the OTP to the database
    await newOTP.save();

    res.json({
      success: true,
      message: 'otp sent',
      user: {
        firstName,
        lastName,
        email,
        accountType,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = Signup;

