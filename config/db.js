const mongoose = require('mongoose');
require("dotenv").config;

const conn = mongoose.connect(process.env.DB_URL);

module.export.conn;