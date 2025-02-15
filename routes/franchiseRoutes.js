const express = require('express');
const router = express.Router();
const CarDealerFranchise = require('../models/CarDealerFranchise');

// Get all franchises
router.get('/', async (req, res) => {
  try {
    const franchises = await CarDealerFranchise.find();
    res.status(200).json(franchises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get franchise by ID
router.get('/:franchiseId', async (req, res) => {
  try {
    const franchise = await CarDealerFranchise.findById(req.params.franchiseId);
    if (!franchise) {
      return res.status(404).json({ message: 'Franchise not found' });
    }
    res.status(200).json(franchise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new car dealer franchise
router.post('/', async (req, res) => {
  try {
    const newFranchise = new CarDealerFranchise(req.body);
    await newFranchise.save();
    res.status(201).json(newFranchise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update franchise by ID
router.put('/:franchiseId', async (req, res) => {
  try {
    const updatedFranchise = await CarDealerFranchise.findByIdAndUpdate(req.params.franchiseId, req.body, { new: true });
    if (!updatedFranchise) {
      return res.status(404).json({ message: 'Franchise not found' });
    }
    res.status(200).json(updatedFranchise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete franchise by ID
router.delete('/:franchiseId', async (req, res) => {
  try {
    const deletedFranchise = await CarDealerFranchise.findByIdAndDelete(req.params.franchiseId);
    if (!deletedFranchise) {
      return res.status(404).json({ message: 'Franchise not found' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
