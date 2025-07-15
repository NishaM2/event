const express = require('express')
const { getProfile, updateRole, getAllUsers } = require("../controllers/usercontroller")
const authMiddleware = require('../middlewares/auth')
const roleMiddleware = require("../middlewares/role")

const router = express.Router()

router.get("/profile", authMiddleware, getProfile)
router.put("/role/:userId", authMiddleware, roleMiddleware(['superadmin']), updateRole)
router.get("/all", authMiddleware,roleMiddleware(['admin', 'superadmin']), getAllUsers)

module.exports = router;