const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/fileModels'); 


const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, './tmp'); 
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({ storage });


const UploadBook = asyncHandler(async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ message: 'Error uploading file.', error: err });
        }

        const { title, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const tempPath = file.path;
        const targetPath = path.join('./tmp', `${Date.now()}-${file.originalname}`);

        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error('Error moving file:', err);
                return res.status(500).json({ message: 'Error moving file', error: err });
            }
            res.status(200).json({ message: 'File uploaded successfully', path: targetPath });
        });
    });
});

const Allbooks = asyncHandler(async (_req, res) => {
    const files = await File.find();
    res.status(200).json({ files });
});

module.exports = { UploadBook, Allbooks };