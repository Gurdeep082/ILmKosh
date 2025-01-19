const asyncHandler = require('express-async-handler');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Book = require('../models/BookModels'); // Ensure the correct path to the Book model

// Create a connection to MongoDB
const conn = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Initialize GridFS
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Specify the collection name for storing files
});

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Upload Book Function
const UploadBook = asyncHandler(async (req, res) => {
    const { title, description, bookType } = req.body;
    const file = req.file;

    if (!file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    // Create a readable stream from the file buffer
    const writestream = gfs.createWriteStream({
        filename: file.originalname,
        contentType: file.mimetype,
    });

    // Pipe the file buffer to GridFS
    writestream.on('close', async (file) => {
        // File has been uploaded to GridFS
        const newBook = new Book({
            title,
            description,
            bookType,
            filePath: file._id, // Store the file ID in the database
        });

        await newBook.save();
        res.status(201).json({ message: 'Book uploaded successfully', fileId: file._id });
    });

    writestream.on('error', (err) => {
        res.status(500).json({ message: 'Error uploading file', error: err });
    });

    writestream.end(file.buffer); // End the writable stream
});

// Get All Books Function
const Allbooks = asyncHandler(async (_req, res) => {
    const books = await Book.find();
    res.status(200).json({ books });
});

// Get Books by Type Function
const BookType = asyncHandler(async (req, res) => {
    const genre = req.params.genre;
    const books = await Book.find({ bookType: genre });
    res.json({ items: books });
});

// Export the functions
module.exports = { UploadBook, upload, Allbooks, BookType };