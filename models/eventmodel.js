const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema ({
    title: {
        type: String,
    },
    description: String,
    date: Date,
    time: String,
    venue: String,
    category: {
        type: String,
        enum: ["technical", "non-technical", "cultural", "sports"],
        required: true
    },
    organizer: String,
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    infopdf: String,
    poster: String,
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],
        default: "upcoming"
    },
})

module.exports = mongoose.model('Event', eventSchema);