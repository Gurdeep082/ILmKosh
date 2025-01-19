const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    bookname: { type: String, required: true },
    bookType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
