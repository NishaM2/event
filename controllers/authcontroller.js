const express = require("express");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const userExist = await User.findOne({
        email: req.body.email
        })

        if(userExist) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        })

        return res.status(200).json({
            message: "User created successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Error creating user"
        })
    }
}

const loginUser = async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            res.status(400).json({
                message: "User not found"
            })
        } 
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!isPasswordCorrect) {
            res.status(401).json({
                message: "Incorrect password"
            })
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1d'}
        )
        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                name: user.name,
                id: user._id,
                email: user.email,
                role: user.role,
            }
        })

    } catch (error) {
        res.status(400).json({
            message: "Error logging in"
        })
    }
}

module.exports = { registerUser, loginUser }
