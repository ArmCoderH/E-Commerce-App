import express from 'express';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const accessToken = jwt.sign(
        {userId: user?._id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2d' }
    )
    const refreshToken = jwt.sign(
        {userId: user?._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    return {accessToken, refreshToken}
}

//login signup API

const loginOrSignup = async (req, res) => {
    const { phone, address } = req.body;
    try {
        let user = await User.findOne({ phone });

        if (!user) {
            // Create a new user if not found
            user = new User({ phone, address });
        } else {
            // Update existing user address
            user.address = address;
        }

        await user.save(); // Save user after creating/updating

        const { accessToken, refreshToken } = generateToken(user.toObject());

        res.status(200).json({
            user,
            refreshToken,
            accessToken,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: error.message });
    }
};




export {loginOrSignup}