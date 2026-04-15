const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Route imports
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// Middleware imports
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env variables
dotenv.config();

// Connect to Database
const connectDB = async () => {
  try {
    const connUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resume-builder';
    const conn = await mongoose.connect(connUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
