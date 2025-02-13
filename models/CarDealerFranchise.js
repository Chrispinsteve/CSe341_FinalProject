const mongoose = require('mongoose');

const CarDealerFranchiseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emails: { type: [String], required: true }
});

module.exports = mongoose.model('CarDealerFranchise', CarDealerFranchiseSchema);
