// routes.js

const express = require('express');

const {OTPsender, signUp, login, changePassword, verifyOTP,logout,allUsers,getUserDetails,updateUser,deleteUser}=require('../controller/AuthController')


const { auth, isAdmin } = require("../middlewares/auth")
const router = express.Router();


router.post('/OTP', OTPsender);
router.post('/signUp', signUp);
router.post('/login', login);
router.post('/changePassword', changePassword);
router.post('/verifyOTP', verifyOTP);
router.get('/logout',logout)
router.get('admin/getUser',auth,isAdmin,allUsers)
router.get('admin/getUser/:id',auth,isAdmin,getUserDetails)
router.put('admin/updateUser/:id',auth,isAdmin,updateUser)
router.put('admin/deleteUser/:id',auth,isAdmin,deleteUser)

module.exports = router;
