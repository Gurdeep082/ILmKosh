// filepath: /c:/Users/saini/Desktop/ILmKosh/Server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fileRoutes = require('./routes/booksRoutes'); 
const authRoutes = require('./routes/userRoutes'); // Import auth routes

app.use(cors({ origin: 'http://localhost:3001', // your frontend origin 
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
allowedHeaders: 'Content-Type, Authorization', }));

const app = express();
app.get('/', (req, res) => { res.send('Hello, World!'); });
// Middleware


// Manually add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// filepath: /c:/Users/saini/Desktop/ILmKosh/Server/server.js
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});
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