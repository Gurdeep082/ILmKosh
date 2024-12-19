// filepath: /c:/Users/saini/Desktop/ILmKosh/Server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fileRoutes = require('./routes/booksRoutes'); 
const authRoutes = require('./routes/userRoutes'); // Import auth routes

const app = express();

app.get('/', (req, res) => { res.send('Working'); });
// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/user', authRoutes); // Use auth routes
app.use('/books', fileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});