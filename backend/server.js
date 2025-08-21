const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Explicitly allow your frontend
    credentials: true, // Optional: Allow cookies/auth headers
}));

// routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB: ', mongoose.connection.db.databaseName))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});