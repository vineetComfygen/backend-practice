const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


//Generate Web token
const createToken = (userId) => {
    return jwt.sign({ id: userId }, 'your_jwt_secret' , { 
        expiresIn: '1h' 
    });
};


// signup user
exports.signup = async (req, res) => {
    const {name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser)return res.status(400).json({message: "Email already in use"});

        const user = await User.create({name, email, password});
        const token = createToken(user._id);
        res.status(200).json({token :token})
    } catch (error) {
        console.log("eee", error)
        res.status(500).json({error: "Server error"})
    }
};

//Login user

exports.login = async (req, res) => {
    const {email, password} =  req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error: "User not found"})
        const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({error : "Invalid Credentials"})
    }
    const token = createToken(user._id);
    res.json({user: user._id, token});
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
};