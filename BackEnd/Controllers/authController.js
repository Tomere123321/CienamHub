const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel');
const generateToken = require('../JWT/jwt'); 

router.post('/login', async (req, res) => { 
    try {
        const { userName, password } = req.body;
        const user = await userModel.findOne({ userName }); 

        if (!user || user.password !== password) {  
            return res.status(400).json({ error: "Invalid userName or password" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({ 
            _id: user._id,
            userName: user.userName,
            token: token
        });
   
    } catch (error) {
        console.error("Error in auth Controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
