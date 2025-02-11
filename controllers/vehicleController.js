// vehiclesController.js
const Vehicle = require('../models/vehicleModel');

// 🚗💨 Create a vehicle
exports.createVehicle = async (req, res) => {
  /* #swagger.tags = ['Vehicle']
     #swagger.requestBody = {
       required: true,
       content: { "application/json": { schema: { $ref: "#/components/schemas/Vehicle" } } }
     } */
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: `Oopsie! Couldn't save your cool ride: ${error.message}` });
  }
};

// 🔧 Update a vehicle (because cars need maintenance, duh)
exports.updateVehicle = async (req, res) => {
  /* #swagger.tags = ['Vehicle']
     #swagger.parameters['vehicleId'] = { in: 'query', description: 'ID of the vehicle to update', required: true, schema: { type: 'string' } }
     #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Vehicle" } } } } */
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.body.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle vanished into the void! 🔎' });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: `Something went vroom-vroom wrong: ${error.message}` });
  }
};

// 🚗📋 Get all vehicles (because variety is the spice of life)
exports.getVehicles = async (req, res) => {
  /* #swagger.tags = ['Vehicle'] */
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ message: `Failed to fetch the garage: ${error.message}` });
  }
};

// 🏷️ Find vehicles by brand (Because we all have our favorites)
exports.findVehiclesByBrand = async (req, res) => {
  /* #swagger.tags = ['Vehicle'] */
  try {
    const vehicles = await Vehicle.find({ brand: req.query.brand });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ message: `Oops, can't find those ${req.query.brand} beauties: ${error.message}` });
  }
};

// 🗓️ Find vehicles by year (Time traveling through car models)
exports.findVehiclesByYear = async (req, res) => {
  /* #swagger.tags = ['Vehicle'] */
  try {
    const vehicles = await Vehicle.find({ year: req.query.year });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ message: `Year ${req.query.year}? Must be a classic! But there's an error: ${error.message}` });
  }
};

// 🚙 Find vehicles by type (Because not everyone wants a sports car)
exports.findVehiclesByType = async (req, res) => {
  /* #swagger.tags = ['Vehicle'] */
  try {
    const vehicles = await Vehicle.find({ type: req.query.type });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ message: `Sorry, no ${req.query.type} in stock! 🚜 ${error.message}` });
  }
};

// 🔍 Get vehicle by ID (CSI: Car Scene Investigation)
exports.getVehicleById = async (req, res) => {
  /* #swagger.tags = ['Vehicle'] */
  try {
    const vehicle = await Vehicle.findById(req.params.vehiclesId);
    if (!vehicle) return res.status(404).json({ message: '🚨 Vehicle missing! Call the authorities! 🚔' });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: `Error retrieving vehicle. Maybe it ran away? 🏃💨 ${error.message}` });
  }
};

// 💀 Delete vehicle by ID (Rest in pieces, dear car)
exports.deleteVehicleById = async (req, res) => {
  /* #swagger.tags = ['Vehicle'] */
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.vehiclesId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle already ghosted. 👻' });
    res.status(200).json({ message: '🚗💥 Vehicle deleted successfully. Gone but not forgotten!' });
  } catch (error) {
    res.status(400).json({ message: `Couldn't scrap this vehicle. Error: ${error.message}` });
  }
};
