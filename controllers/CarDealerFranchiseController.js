const CarDealerFranchise = require('../models/CarDealerFranchise');

// Get all car dealership franchises
exports.getAllFranchises = async (req, res) => {
    try {
        const franchises = await CarDealerFranchise.find();
        res.status(200).json(franchises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching franchises', error });
    }
};

// Get a specific franchise by ID
exports.getFranchiseById = async (req, res) => {
    try {
        const franchise = await CarDealerFranchise.findById(req.params.id);
        if (!franchise) {
            return res.status(404).json({ message: 'Franchise not found' });
        }
        res.status(200).json(franchise);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching franchise', error });
    }
};

// Create a new car dealership franchise
exports.createFranchise = async (req, res) => {
    try {
        const newFranchise = new CarDealerFranchise(req.body);
        await newFranchise.save();
        res.status(201).json(newFranchise);
    } catch (error) {
        res.status(400).json({ message: 'Error creating franchise', error });
    }
};

// Update a franchise by ID
exports.updateFranchise = async (req, res) => {
    try {
        const updatedFranchise = await CarDealerFranchise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedFranchise) {
            return res.status(404).json({ message: 'Franchise not found' });
        }
        res.status(200).json(updatedFranchise);
    } catch (error) {
        res.status(400).json({ message: 'Error updating franchise', error });
    }
};

// Delete a franchise by ID
exports.deleteFranchise = async (req, res) => {
    try {
        const deletedFranchise = await CarDealerFranchise.findByIdAndDelete(req.params.id);
        if (!deletedFranchise) {
            return res.status(404).json({ message: 'Franchise not found' });
        }
        res.status(200).json({ message: 'Franchise deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting franchise', error });
    }
};
