const mongoose = require('mongoose');

const AftermarketSchema = new mongoose.Schema({
    partName: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    compatibility: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    supplier: { type: String, required: true }
});

module.exports = mongoose.model('Aftermarket', AftermarketSchema);
