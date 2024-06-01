const express = require('express');
const router=express.Router()
const { updateProfile } = require('../controller/ProfileController');
const { imageUpload } = require('../config/cloudinary');

router.put('/profile/updateProfile', updateProfile);
router.post('/imageUpload', imageUpload);


module.exports = router;