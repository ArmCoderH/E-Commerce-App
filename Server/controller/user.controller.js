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

const loginOrSignup = async(req,res) => {
    const {phone,address} = req.body;
    try {
        const user = await User.findOne({phone})
        if(!user){
            //make new user
            user = new User({phone,address})
            await user.save();  
        }else{


            // when user is already exit then update existing user address
            user.address = address;
            await user.save();
        }

    const {accessToken,refreshToken} = generateToken(user.toObject());
    res.status(200).json({
        user,
        refreshToken,
        accessToken
    })
    } catch (error) {
        console.log(error);
        //server error check
        res.status(500).json({error: error.message});
    }
}



export {loginOrSignup}