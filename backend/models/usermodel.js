const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "admin", "superadmin"],
        required: true,
    },
    department: {
        type: String,
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registration',
    }]
})

module.exports = mongoose.model('User', userSchema);