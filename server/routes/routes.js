// routes.js

const express = require('express');

const signUp=require('../controller/Auth')
const router = express.Router();

// Route to create a new user
router.post('/signup', signUp);

module.exports = router;
