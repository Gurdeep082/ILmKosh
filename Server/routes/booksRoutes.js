const express = require('express');
const router = express.Router();
const { UploadBook, Allbooks } = require('../controllers/booksController');
const { validateJwtToken } = require('../middlewares/jwtAuthMiddleware');

router.post('/upload', validateJwtToken, UploadBook);
router.get('/allbooks', validateJwtToken, Allbooks);

module.exports = router;