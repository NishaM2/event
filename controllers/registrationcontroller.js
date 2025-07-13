const express = require("express")
const {Event} = require("../models/eventmodel")
const {User} = require("../models/usermodel")
const {Registration} = require("../models/registrationmodel")

const registerForEvent = async(req, res) => {
    const event = await Event.findById(req.params.eventId);
    const user = await User.findById(req.user.userId);

    const alreadyRegistered = await Registration.findOne({
        eventId: req.params.eventId,
        userId: req.user.userId
    })
    
    if(alreadyRegistered) {
        return res.status(400).json({
            message: "user already registered for this event"
        });
    }
    const newRegistration = await Registration.create({
        userId: user._id,
        eventId: event._id,
    })
    return res.status(200).json({
        message: "user registered for the event successfully",
    })
}

const getRegisteredUsers = async(req, res) => {
    const registrations = await Registration.find({
        eventId: req.params.eventId
    }).populate("userId", "name email role");

    if(!registrations || registrations.length === 0) {
        return res.status(404).json({
            message: "no registrations found for this event"
        })
    }
    return res.status(200).json({
        message: "registered users for the event",
        users: registrations.map(reg => reg.userId)
    })
}