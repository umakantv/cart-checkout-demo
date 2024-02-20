require('dotenv').config();
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

const token = generateToken({ id: 1 });

console.log(token)