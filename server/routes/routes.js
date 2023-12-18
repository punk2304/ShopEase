// routes.js

const express = require('express');

const {OTPsender,signUp}=require('../controller/Auth')
const router = express.Router();

// Route to create a new user
router.post('/OTP', OTPsender);
router.post('/signUp', signUp);

module.exports = router;
