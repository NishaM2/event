const express = require('express')
const { generateCertificates, downloadCertificate } = require("../controllers/certificatecontroller")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")

const router = express.Router();

router.post("/generate-certificate/:eventId", authMiddleware, roleMiddleware(["student"]), generateCertificates)
router.get("/download-certificate/:eventId/:userId", authMiddleware, roleMiddleware(["student"]), downloadCertificate)

module.exports = router