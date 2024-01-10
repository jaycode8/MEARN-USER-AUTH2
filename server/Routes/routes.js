const router = require('express').Router();
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SecreteKey;
const {
    addUser, authUser, userData
} = require("../controller/users");

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

router.post('/user', addUser);

router.post('/auth', authUser);

router.get('/user', verifyToken, userData);

module.exports = router;
