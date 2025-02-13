const Aftermarket = require('../models/aftermarketModel');

// Get all aftermarket parts
exports.getAllAftermarketParts = async (req, res) => {
    try {
        const parts = await Aftermarket.find().populate('brand compatibility');
        res.status(200).json(parts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single aftermarket part by ID
exports.getAftermarketPartById = async (req, res) => {
    try {
        const part = await Aftermarket.findById(req.params.id).populate('brand compatibility');
        if (!part) return res.status(404).json({ message: 'Part not found' });
        res.status(200).json(part);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new aftermarket part
exports.createAftermarketPart = async (req, res) => {
    try {
        const part = new Aftermarket(req.body);
        await part.save();
        res.status(201).json(part);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an aftermarket part
exports.updateAftermarketPart = async (req, res) => {
    try {
        const part = await Aftermarket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!part) return res.status(404).json({ message: 'Part not found' });
        res.status(200).json(part);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an aftermarket part
exports.deleteAftermarketPart = async (req, res) => {
    try {
        const part = await Aftermarket.findByIdAndDelete(req.params.id);
        if (!part) return res.status(404).json({ message: 'Part not found' });
        res.status(200).json({ message: 'Part deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
