const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { UploadBook, Allbooks } = require('../controllers/booksController');
const { validateJwtToken } = require('../middlewares/jwtAuthMiddleware');

router.post('/upload',validateJwtToken, upload.single('file'), UploadBook);
router.get('/uploadedbooks', validateJwtToken, Allbooks);

module.exports = router;