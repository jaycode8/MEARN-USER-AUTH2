const router = require('express').Router();
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SecreteKey;
const mongoose = require('mongoose');
const {
    usersSchema
} = require('../MODELS/users.model');
const userModel = mongoose.model('user',usersSchema);
require('../MODELS/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = await req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.substring(7);
            const validateToken = await jwt.verify(accessToken, jwtKey);
            if (validateToken) {
                req.authenticated = true;
                res.id = validateToken // this is the information response of the user sent to client
                return next()
            }
        } else {
            return res.status(400).json({ error: "User not authenticated" });
        }
    } catch (error) {
        res.json({ message: error })
    }
}

router.post('/postUser', async (req,res) =>{
    try {
        const user = new userModel(req.body.data);
        if (user.FirstName == '' || user.LastName == '' || user.Email == '' || user.Password == '') {
            res.json({ success: false, message: 'All fields are required...' });
        } else {
            let oldUser = await userModel.findOne({ "Email": user.Email });
            if (oldUser) {
                res.json({ success: false, message: 'Email allready exist !!' });
            } else {
                user.Password = await bcrypt.hash(user.Password, saltRounds);
                await user.save();
                res.json({ success: true, message: 'user succesfully added to system' , servercode:200});
            }
        }
    } catch (error) {
        res.json({success:false, message:'error adding user to system'});
    };
});

router.post('/auth', async(req,res) =>{
    try{
        const user = req.body.data;
        if(user.Email == '' && user.Password == ''){
            res.json({msg:'All fields are required...'});
        }
        else if(user.Email == ''){
            res.json({msg:'Email Address field required'});
        }
        else if(user.Password == ''){
            res.json({msg:'Password field is required'});
        }
        else{
            const foundUser = await userModel.find({'Email':user.Email});
            if(foundUser){
                const passMatch = await bcrypt.compare(user.Password,foundUser[0].Password);
                if(passMatch == true){
                    let tokens = await jwt.sign({ userId:foundUser[0]._id}, jwtKey);
                    res.cookie("access-token", tokens,{
                        maxAge:60*60*24*10000,
                        httpOnly: true
                    })
                    res.json({ msg: "Successfully loged in", logedUser: foundUser[0]._id, servercode: 200, token : tokens })
                }else{
                    res.json({msg:"Login details mismatch"})
                }
            }
        };
    }
    catch(err){
        res.json({ msg: "User with that email does not exist" });
    };
});

router.get('/users',verifyToken, async (req,res) =>{
    try {
        const user = await userModel.findById(res.id.userId);
        console.log(user);
        res.json({msg:user});
    } catch (error) {
        res.json({msg:'error'})
    }
})

router.get('/logout', verifyToken, async (req, res) => {
    try {
        res.clearCookie("access-token");
        res.json({msg:"cookie deleted", status:200})
    } catch (error) {
        res.json({msg:'error during logout', status:400})
    }
})


module.exports = router;