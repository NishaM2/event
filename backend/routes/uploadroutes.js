const express = require('express')
const { uploadPdf, uploadPoster } = require("../controllers/uploadcontroller")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")
const { uploadEventFiles } = require("../middlewares/multer")

const router = express.Router()

router.post("/upload-poster/:eventId", authMiddleware, roleMiddleware(["admin", "superadmin"]), 
        uploadEventFiles.fields([{ name: "poster", maxCount: 1 }]),
        uploadPoster)
router.post("/upload-pdf/:eventId", authMiddleware, roleMiddleware(["admin", "superadmin"]), 
        uploadEventFiles.fields([{ name: "infopdf", maxCount: 1 }]),
        uploadPdf)

module.exports = router;




