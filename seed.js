require('dotenv').config();
const mongoose = require('mongoose');
const Brand = require('./models/brandsModel');
const Vehicle = require('./models/vehiclesModel');
const Part = require('./models/partsModel');
const User = require('./models/usersModel');

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

async function seedDatabase() {
    try {
        // Create a sample brand
        const toyota = await Brand.create({
            name: "Toyota",
            country: "Japan",
            startingDate: new Date("1937-08-28"),
            headquarters: "Toyota City, Japan",
            founders: ["Kiichiro Toyoda"]
        });

        // Create a sample vehicle
        const camry = await Vehicle.create({
            year: 2023,
            name: "Camry",
            brand: toyota._id,
            type: "Sedan",
            description: "A popular mid-size sedan with great fuel efficiency",
            colorsAvailable: ["Red", "Black", "White"],
            engineType: "2.5L 4-cylinder",
            fuelType: "Gasoline",
            transmission: "Automatic"
        });

        // Create a sample part
        await Part.create({
            name: "Brake Pad",
            brand: toyota._id,
            vehicles: [camry._id],
            quality: "OEM"
        });

        // Create a sample user
        await User.create({
            userName: "adminUser",
            email: "admin@example.com",
            firstName: "John",
            lastName: "Doe",
            accountType: "Admin",
            phoneNumber: "123-456-7890",
            passwordHash: "hashedpassword123" // In production, hash passwords!
        });

        console.log('✅ Sample data added successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
