const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },  // ✅ Ensure ObjectId reference
    Year: { type: Number, required: true },
    Type: { type: String, required: true },
    Description: { type: String },
    Engine_type: { type: String },
    Fuel_type: { type: String },
    Transmission: { type: String },
    colors_available: { type: [String] }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
