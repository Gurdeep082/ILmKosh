const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fileRoutes = require('./routes/booksRoutes'); 


const app = express();

app.get('/', (req, res) => { res.send('Working'); });
// Middleware
const allowedOrigins = ["https://ilm-kosh.netlify.app", "http://localhost:3000", "http://localhost:3001"];

// Middleware
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Handle preflight requests
app.options('*', cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Connect to MongoDB
console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
mongoose.set('debug', true); // Enable mongoose debug mode
 mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB connected'))
 .catch(err => { console.error('MongoDB connection error:', err.message);
  process.exit(1); // Exit the process if there's a connection error 
  });

// Routes
const authRoutes = require('./routes/userRoutes'); // Import auth routes
app.use('/user', authRoutes); // Use auth routes
app.use('/books', fileRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
