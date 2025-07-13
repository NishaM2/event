const express = require("express")
const {Event} = require("../models/eventmodel")

const createEvent = async(req, res) => {
    const {title, description, date, time, venue, category,
        organizer, status } = req.body;
    
    const infopdf = req.files?.infopdf?.[0]?.path
    const poster = req.files?.poster?.[0]?.path
    const createdBy = req.user.userId

    const newEvent = await Event.create({
        title, description, date, time, venue, category,
        organizer, infopdf, poster, status, createdBy,
    })

    res.status(200).json({
        message: "new event created successfully",
        event: newEvent,
    })
}

const getAllEvents = async(req, res) => {
    const events = await Event.find({})
    res.status(200).json({events});
}

const getEventById = async(req, res) => {
    const event = await Event.findById(req.params.id)
    if(!event) {
        return res.status(404).json({message: "event not found"})
    }
    res.status(200).json(event);
}

const updateEvent = async(req,res) => {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedEvent) {
        return res.status(404).json({message: "event not found"})
    }
    return res.status(200).json({
        message: "event updated successfully",
        event: updatedEvent
    })
}

const deleteEvent = async(req, res) => {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if(!deletedEvent) {
        return res.status(404).json({message: "event not found"})
    }
    return res.status(400).json({
        message: "event deleted successfully",
        event: deletedEvent
    })
}

