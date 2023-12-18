// routes.js

const express = require('express');

const {OTPsender,signUp}=require('../controller/Auth')
const router = express.Router();

// Route to create a new user
router.post('/OTP', OTPsender);
router.post('/signUp', signUp);

router.get('/login', async(req, res) =>{
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
            return res.status(200).json({
              success: true,
              message: `User is logged in successfully`
            });
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
});

module.exports = router;
