const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
