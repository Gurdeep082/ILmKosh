const express = require('express');
const router = express.Router();
const { UploadBook, Allbooks ,BookType} = require('../controllers/booksController');
const { validateJwtToken } = require('../middlewares/jwtAuthMiddleware');

router.post('/upload', validateJwtToken, UploadBook);
router.get('/allbooks', Allbooks);
router.get('/type/:bookType', BookType);

module.exports = router;