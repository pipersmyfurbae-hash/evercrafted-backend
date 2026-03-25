const express = require('express');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Route imports
const authRoutes = require('./routes/auth');
const designRoutes = require('./routes/designs');
const engineRoutes = require('./routes/engine');
const orderRoutes = require('./routes/orders');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/engine', engineRoutes);
app.use('/api/orders', orderRoutes);

// Export the app for use in other parts of the application
module.exports = app;
