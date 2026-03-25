const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware to verify the token
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; // Add user to request
        next(); // Proceed to the next middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = verifyToken;