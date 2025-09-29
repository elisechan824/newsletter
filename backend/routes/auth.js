const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

// passcode validation
router.post('/validate-passcode', (req, res) => {
  try {
    const { passcode } = req.body;
    if (!passcode) { // empty passcode
      res.status(400).json({ error: "Passcode is required." });
      console.log("empty passcode");
    }
    if (passcode === process.env.PASSCODE) { // correct passcode
      res.status(201).json({ message: 'Success! You will be redirected to login.' });
    } else { // incorrect passcode
      res.status(401).json({ error: "Incorrect passcode. Please try again." });
      console.log("false");
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// register new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    // validate all fields
    if (!username || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // validate password strength
    // TODO: add more requirements
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // insert user
    const user = new User({ username, password, name })
    await user.save();
    console.log('User saved successfully:', user._id);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// user login
router.post('/login', async (req, res) => {
  // Validate credentials and return JWT token
  try {
    const { username, password } =  req.body;
    
    // check if username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Username does not exist.' })
    }

    // validate password
    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Create jwt token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log("login successful");
    res.json({ 
      message: 'Login successful', 
      token,
      user: { id: user._id, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;