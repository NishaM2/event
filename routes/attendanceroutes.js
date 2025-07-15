const express = require('express')
const { generateQRCode, markAttendance, getAttendanceReport } = require("../controllers/attendancecontroller")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")

const router = express.Router()

router.post("/generateqr/:eventId", authMiddleware, roleMiddleware(["student"]), generateQRCode)
router.post("/mark-attendance/:eventId", authMiddleware, markAttendance)
router.get("/attendance-report/:eventId", authMiddleware, roleMiddleware(["admin", "superadmin"]), getAttendanceReport)

module.exports = router;