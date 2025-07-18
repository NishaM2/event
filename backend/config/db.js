const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB;