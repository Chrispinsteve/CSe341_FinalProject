const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Create a single user with validation
exports.createUser = async (req, res) => {
  /*
   #swagger.tags = ['Users']
   #swagger.requestBody = {
      description: 'Create a User',
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }
   }
  */

  // Validate request body
  await Promise.all([
    body('UserName').isString().notEmpty().withMessage('Username is required').run(req),
    body('Email').isEmail().withMessage('Valid email is required').run(req),
    body('FirstName').isString().notEmpty().withMessage('First name is required').run(req),
    body('LastName').isString().notEmpty().withMessage('Last name is required').run(req),
    body('AccountType').isIn(['Admin', 'User']).withMessage('Account type must be Admin or User').run(req),
    body('PhoneNumber').isString().optional().run(req),
    body('PasswordHash').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.PasswordHash, 10);
    
    const user = new User({
      ...req.body,
      PasswordHash: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Create multiple users from an array
exports.createUsersWithArray = async (req, res) => {
  /*
     #swagger.tags = ['Users']
      #swagger.requestBody = {
        description: 'Create A from array',
         required: true,
         content: {
           "application/json": {
             schema: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
            }
          }
       }
     }
  */
  try {
    const users = await User.insertMany(req.body);
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create multiple users from a list
exports.createUsersWithList = async (req, res) => {
  /*
     #swagger.tags = ['Users']
           description: 'Create by list',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          }

        }
      }
  */
  try {
    const users = await User.insertMany(req.body);
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  // Add authentication logic here
  res.status(200).json({ message: 'User logged in' });
};

// User logout
exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: 'User logged out' });
};

// Find users by type
exports.findUsersByType = async (req, res) => {
  /*
     #swagger.tags = ['Users']
      #swagger.responses[200] = {
      description: 'Find a user By Type',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          }

        }
      }
   }
  */
  try {
    const users = await User.find({ type: req.query.type });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  /*
     #swagger.tags = ['Users']
     content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }

  */
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user by username
exports.updateUserByUsername = async (req, res) => {
  /*
     #swagger.tags = ['Users']
     content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }

  */
  try {
    const user = await User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by username
exports.deleteUserByUsername = async (req, res) => {
  /*
     #swagger.tags = ['Users']
  */
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
