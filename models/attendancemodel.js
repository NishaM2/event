const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkInTime: {
        type: Date,
        required: true,
    },
    isPresent: {
        type: Boolean,
        required: true,
        default: false,
    }
})

attendanceSchema.index({
    eventId: 1,
    userId: 1,
}, {
    unique: true,
})

module.exports = mongoose.model("Attendance", attendanceSchema)