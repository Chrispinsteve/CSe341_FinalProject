const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    startingDate: { type: Date, required: true },
    logo: { type: String },  // Base64 encoded image
    headquarters: { type: String },
    founders: { type: [String] } // Array of founder names
});

module.exports = mongoose.model('Brand', brandSchema);