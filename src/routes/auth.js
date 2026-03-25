const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Mock user database
const users = [];

// Register endpoint
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;