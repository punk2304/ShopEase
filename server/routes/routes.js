// routes.js

const express = require('express');

// const {OTPsender, signUp, login, changePassword, verifyOTP}=require('../controller/Auth');
const { updateProfile } = require('../controller/Profile');
const { imageUpload } = require('../config/cloudinary');
const {OTPsender, signUp, login, changePassword, verifyOTP,hello}=require('../controller/Auth')
const {getAllRatingsByUserId}=require('../controller/Ratings')
const {updateFavoriteCategories}=require('../controller/Category')
const {search}=require('../controller/Book');

const router = express.Router();

// Route to create a new user
router.post('/OTP', OTPsender);
router.post('/signUp', signUp);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/verifyOTP', verifyOTP);
router.post('/search',search);

router.post('/myRatings',getAllRatingsByUserId);
 

router.post('/imageUpload', imageUpload);
router.post('/updateFavCategory', updateFavoriteCategories);


router.put('/profile/updateProfile', updateProfile);

module.exports = router;