const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// passcode validation
router.post('/validate-passcode', (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ error: "Passcode is required" });
  }
  if (passcode === process.env.PASSCODE) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // TODO: save to MongoDB
});

// user login
router.post('/login', async (req, res) => {
  // Validate credentials and return JWT token
});

module.exports = router;