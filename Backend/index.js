const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Database connection
const sequelize = require('./config/database');

// Import routes
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONT_END_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}))

// Route
app.use('/users', userRoutes);

// Test database connection and sync models
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log('Error syncing database: ' + err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});