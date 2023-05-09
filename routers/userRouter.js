const {User} = require('../models/User');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get(`/`, async (req,res) => {
    const userList = await User.find();

    if (!userList){
        res.status(500).json({success: false});
    }
    res.send(userList);
})

router.get(`/:id`, async (req,res) => {
    const user = await User.findOne({id: req.params.id});

    if (!user){
        res.status(500).json({message: 'The user with the given ID was not found!'})
    }
    res.status(200).send(user);
})

router.post(`/`, async (req,res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if (!user){
        return res.status(400).send('The user can not be created')
    }
    res.send(user);
})

router.put(`/:id`, async (req,res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate()
})


module.exports = router;