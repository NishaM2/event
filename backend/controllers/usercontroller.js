const User = require("../models/usermodel")

const getProfile = async(req, res) => {

    const user = await User.findById(req.user.userId);

    return res.status(200).json({
        user: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}

const updateRole = async(req, res) => {
    const role = req.user.role;

    if(role !== 'superadmin') {
        return res.status(403).json({
            message: "access denied"
        })
    }

    const userId = req.params.userId;
    const newrole = req.body.role;

    const user = await User.findById(userId);
    if(!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    
    user.role = newrole;
    await user.save()
    
    return res.status(200).json({
        message: "Role updated successfully",
    })
}

const getAllUsers = async(req, res) => {
    const users = await User.find({}, "-password")
    return res.status(200).json({users})
}

module.exports = { getProfile, updateRole, getAllUsers }