// routes.js

const express = require('express');

const {OTPsender, signUp, login, changePassword, verifyOTP}=require('../controller/Auth')
const router = express.Router();

// Route to create a new user
router.post('/OTP', OTPsender);
router.post('/signUp', signUp);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/verifyOTP', verifyOTP);

module.exports = router;
