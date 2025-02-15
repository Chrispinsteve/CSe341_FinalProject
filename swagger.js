const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const mongooseToSwagger = require('mongoose-to-swagger');
const mongoose = require('mongoose');

const partsModel = require('./models/partsModel');
const userModel = require('./models/userModel');
const vehicleModel = require('./models/vehicleModel');

const partsSchema = mongooseToSwagger(partsModel);
const userSchema = mongooseToSwagger(userModel);
const vehicleSchema = mongooseToSwagger(vehicleModel);

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Commercial Vehicle Information Database',
    description: 'Commercial Vehicle Information Database',
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
