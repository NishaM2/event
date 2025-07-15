const express = require('express')
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventcontroller")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")
const { uploadEventFiles } = require("../middlewares/multer")

const router = express.Router()

router.post("/create-event", authMiddleware, roleMiddleware(["admin", "superadmin"]), 
            uploadEventFiles.fields([
                { name: "poster", maxCount: 1 },
                { name: "infopdf", maxCount: 1 }
            ]),
            createEvent )
router.get("/all-events", authMiddleware, getAllEvents)
router.get("/event/:eventId", authMiddleware, getEventById)
router.put("/update-event/:eventId", authMiddleware, roleMiddleware(["admin", "superadmin"]), updateEvent)
router.delete("/delete-event/:eventId", authMiddleware, roleMiddleware(["admin", "superadmin"]), deleteEvent)

module.exports = router;