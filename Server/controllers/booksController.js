const asyncHandler = require('express-async-handler');
const multer = require('multer');
const File = require('../models/fileModels'); 


const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, '/uploads/'); 
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({ storage });


const UploadBook = asyncHandler ( async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;
    //console.log('POST request received at /uploads');
    // console.log(req.body); 
    // console.log(req.file); 

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        
        const newFile = new File({
            title,
            description,
            filename: file.filename,
            filepath: file.path,
        });

        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
    } catch (error) {
        res.status(500).json({ message: 'Error saving file metadata.', error });
    }
});
const Allbooks = asyncHandler(async (_req, res) => {
    const files = await File.find();
    res.status(200).json({ files });
});

module.exports = { UploadBook, Allbooks };