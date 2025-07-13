const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({

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
    registrationDate: {
        type: Date,
        default: Date.now,
    }
})

registrationSchema.index({
    eventId: 1,
    userId: 1
}, {
    unique: true
});

module.exports = mongoose.model('Registration',registrationSchema)