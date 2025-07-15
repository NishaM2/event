const Event = require("../models/eventmodel")
const User = require("../models/usermodel")
const Attendance = require("../models/attendancemodel")
const QRCode = require('qrcode')

const generateQRCode = async (req, res) => {
    const event = await Event.findById(req.params.eventId)
    const user = await User.findById(req.user.userId)

    const data = JSON.stringify({
        userId: user._id,
        eventId: event._id,
    })
    QRCode.toDataURL(data, function (err, url) {
        if(err) {
            console.log(err)
        }
        console.log(url);
        return res.status(200).json({url})
    })
}   

const markAttendance = async(req, res) => {
    const event = await Event.findById(req.params.eventId)
    const user = await User.findById(req.body.userId)

    const attendanceExist = await Attendance.findOne({
        eventId: event._id,
        userId: user._id
    })

    if(attendanceExist) {
        return res.status(400).json({
            message: "attendance entry exist"
        })
    }

    const newAttendance = await Attendance.create({
        eventId: event._id,
        userId: user._id,
        checkInTime: new Date(),
        isPresent: true,
    })

    return res.status(200).json({
        message: "attendance entry successfull"
    })
}

const getAttendanceReport = async(req, res) => {
    const event = await Event.findById(req.params.eventId)
    const entries = await Attendance.find({eventId: event._id}).populate("userId", "name email role")

    return res.status(200).json({
        message: "list of registered users",
        list: entries.map(e => ({ name: e.userId.name, time: e.checkInTime}))
    })
}

module.exports = { generateQRCode, markAttendance, getAttendanceReport }