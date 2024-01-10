const mongoose = require('mongoose');
const {
    usersSchema
} = require('../models/users.model');
const userModel = mongoose.model('user', usersSchema);
require('../dbconfig/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SecreteKey;

const addUser = async (req, res) => {
    try {
        const user = new userModel(req.body.data);
        if (user.FirstName == '' || user.LastName == '' || user.Email == '' || user.Password == '') {
            res.json({ success: false, message: 'All fields are required...' });
        } else {
            let oldUser = await userModel.findOne({ "Email": user.Email });
            if (oldUser) {
                res.json({ success: false, message: 'Email allready exist !!', user: oldUser });
            } else {
                user.Password = await bcrypt.hash(user.Password, saltRounds);
                await user.save();
                res.json({ success: true, message: 'user succesfully added to system', servercode: 200 });
            }
        }
    } catch (error) {
        res.json({ success: false, message: 'error adding user to system' });
    };
};

const authUser = async (req, res) => {
    try {
        const user = req.body.data;
        if (user.Email == '' && user.Password == '') {
            res.json({ msg: 'All fields are required...' });
        }
        else if (user.Email == '') {
            res.json({ msg: 'Email Address field required' });
        }
        else if (user.Password == '') {
            res.json({ msg: 'Password field is required' });
        }
        else {
            const foundUser = await userModel.find({ 'Email': user.Email });
            if (foundUser) {
                const passMatch = await bcrypt.compare(user.Password, foundUser[0].Password);
                if (passMatch == true) {
                    let tokens = await jwt.sign({ userId: foundUser[0]._id }, jwtKey);
                    res.json({ msg: "Successfully loged in", logedUser: foundUser[0]._id, servercode: 200, token: tokens })
                } else {
                    res.json({ msg: "Login details mismatch" })
                }
            }
        };
    }
    catch (err) {
        res.json({ msg: "User with that email does not exist", user: "req.body" });
    };
};

const userData = async (req, res) => {
    try {
        const user = await userModel.findById(res.id.userId);
        res.json({ msg: user });
    } catch (error) {
        res.json({ msg: 'error' })
    }
};

module.exports = {
    addUser,
    authUser,
    userData,
}
