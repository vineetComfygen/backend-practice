const express = require("express");
const router = express.Router();
const User  = require('../model/user')

//Create user post
router.post('/create', async (req, res) => {

    try {
        const{name, email, password } = req.body;
    const newUser =  new User({name, email, password });
    const savedUser = await newUser.save();
    return res.json(savedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

});


//Read all the users (GET)
router.get('/' , async (req, res) => {
    try {
        const users = await User.find();
    res.json(users);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

//Read one user by id

router.get('/:id', async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({message: "User not found"})
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message})
        
    }
})


//Update the user by using put
router.put('/:id', async (req, res) => {
    const{name, email, password} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name, email, password},
            {new: true}
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Delete the user 
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.json(deleteUser);
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})


module.exports = router;

