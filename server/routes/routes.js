// routes.js

const express = require('express');
const User = require("../models/User");

const router = express.Router();

// Route to create a new user
router.post('/signup', async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Create a new user
    const newUser = new User({ name, lastName, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
