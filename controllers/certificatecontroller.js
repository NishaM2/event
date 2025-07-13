const { Attendance } = require("../models/attendancemodel")
const { Event } = require("../models/eventmodel")
const { User } = require("../models/usermodel")
const { certificateGenerator } = require("../utils/certificatemaker")
const fs = require('fs')
const path = require("path")

const generateCertificates = async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.body.userId;

    const attendance = await Attendance.findOne({
        userId: userId,
        eventId: eventId,
        isPresent: true
    })

    if (!attendance) {
        return res.status(404).json({
            message: "user is not present in the event"
        })
    }

    const event = await Event.findById(eventId)
    const user = await User.findById(userId)

    if(!event || !user) {
        return res.status(404).json({
            message: "event or user not found"
        })
    }

    const dir = path.join("uploads", "certificates");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir,`${user._id}-${event._id}.pdf`);
    
    await certificateGenerator(user, event, filePath);

    res.status(200).json({
        message: "certificate generated successfully",
        filePath: filePath,
    })
}

const downloadCertificate = async (req, res) => {
    const userId = req.params.userId;
    const eventId = req.params.eventId;

    const filePath = path.join(__dirname, "..", "uploads", "certificates", `${userId}-${eventId}.pdf`)

    if(fs.existsSync(filePath)) {
        return res.download(filePath);
    } else {
        return res.status(404).json({
            message: "certificate not found"
        })
    }
}