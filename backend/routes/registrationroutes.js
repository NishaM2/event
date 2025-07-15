const express = require('express')
const { registerForEvent, getRegisteredUsers } = require('../controllers/registrationcontroller')
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")

const router = express.Router()

router.post("/register/:eventId", authMiddleware, roleMiddleware(["student"]), registerForEvent)
router.get("/registered-users/:eventId", authMiddleware, roleMiddleware(["superadmin", "admin"]), getRegisteredUsers)

module.exports = router;