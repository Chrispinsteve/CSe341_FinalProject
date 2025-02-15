const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const mongooseToSwagger = require('mongoose-to-swagger');
const mongoose = require('mongoose');

const partsModel = require('./models/partsModel');
const userModel = require('./models/userModel');
const vehicleModel = require('./models/vehicleModel');
const franchiseModel = require('./models/CarDealerFranchise');  // Add this for franchise

const partsSchema = mongooseToSwagger(partsModel);
const userSchema = mongooseToSwagger(userModel);
const vehicleSchema = mongooseToSwagger(vehicleModel);
const franchiseSchema = mongooseToSwagger(franchiseModel);  // Add this for franchise

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Commercial Vehicle Information Database',
    description: 'API documentation for managing vehicle, user, and franchise data.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
    {
      url: 'https://cse341-finalproject-4zhu.onrender.com',
      description: 'Render server',
    },
  ],
  components: {
    schemas: {
      Part: partsSchema.properties,
      User: userSchema.properties,
      Vehicle: vehicleSchema.properties,
      CarDealerFranchise: franchiseSchema.properties, // Add franchise schema
    },
  },
  paths: {
    '/api/users': {
      get: {
        summary: 'Get all users',
        responses: {
          200: {
            description: 'A list of users',
          },
        },
      },
      post: {
        summary: 'Create a new user',
        responses: {
          201: {
            description: 'User created',
          },
        },
      },
    },
    '/api/users/{userId}': {
      get: {
        summary: 'Get user by ID',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'User ID',
          },
        ],
        responses: {
          200: {
            description: 'User found',
          },
        },
      },
      put: {
        summary: 'Update user by ID',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'User ID',
          },
        ],
        responses: {
          200: {
            description: 'User updated',
          },
        },
      },
      delete: {
        summary: 'Delete user by ID',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'User ID',
          },
        ],
        responses: {
          204: {
            description: 'User deleted',
          },
        },
      },
    },
    '/api/vehicles': {
      get: {
        summary: 'Get all vehicles',
        responses: {
          200: {
            description: 'A list of vehicles',
          },
        },
      },
      post: {
        summary: 'Create a new vehicle',
        responses: {
          201: {
            description: 'Vehicle created',
          },
        },
      },
    },
    '/api/vehicles/{vehicleId}': {
      get: {
        summary: 'Get vehicle by ID',
        parameters: [
          {
            name: 'vehicleId',
            in: 'path',
            required: true,
            description: 'Vehicle ID',
          },
        ],
        responses: {
          200: {
            description: 'Vehicle found',
          },
        },
      },
      put: {
        summary: 'Update vehicle by ID',
        parameters: [
          {
            name: 'vehicleId',
            in: 'path',
            required: true,
            description: 'Vehicle ID',
          },
        ],
        responses: {
          200: {
            description: 'Vehicle updated',
          },
        },
      },
      delete: {
        summary: 'Delete vehicle by ID',
        parameters: [
          {
            name: 'vehicleId',
            in: 'path',
            required: true,
            description: 'Vehicle ID',
          },
        ],
        responses: {
          204: {
            description: 'Vehicle deleted',
          },
        },
      },
    },
    '/api/franchises': {
      get: {
        summary: 'Get all franchises',
        responses: {
          200: {
            description: 'A list of car dealer franchises',
          },
        },
      },
      post: {
        summary: 'Create a new car dealer franchise',
        responses: {
          201: {
            description: 'Franchise created',
          },
        },
      },
    },
    '/api/franchises/{franchiseId}': {
      get: {
        summary: 'Get franchise by ID',
        parameters: [
          {
            name: 'franchiseId',
            in: 'path',
            required: true,
            description: 'Franchise ID',
          },
        ],
        responses: {
          200: {
            description: 'Franchise found',
          },
        },
      },
      put: {
        summary: 'Update franchise by ID',
        parameters: [
          {
            name: 'franchiseId',
            in: 'path',
            required: true,
            description: 'Franchise ID',
          },
        ],
        responses: {
          200: {
            description: 'Franchise updated',
          },
        },
      },
      delete: {
        summary: 'Delete franchise by ID',
        parameters: [
          {
            name: 'franchiseId',
            in: 'path',
            required: true,
            description: 'Franchise ID',
          },
        ],
        responses: {
          204: {
            description: 'Franchise deleted',
          },
        },
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const generateSwagger = async () => {
  await swaggerAutogen(outputFile, endpointsFiles, doc);
  console.log('Generated swagger file');
};

generateSwagger();
