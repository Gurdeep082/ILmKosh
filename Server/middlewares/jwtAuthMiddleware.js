const jwt = require('jsonwebtoken');
require('dotenv').config();



const validateJwtToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        console.log("Authorization header missing"); // Debugging log
        return res.status(401).json({ err: 'Token not available' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        console.log("Token not found after splitting header"); // Debugging log
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        const validateToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validateToken;
        console.log("Token validated successfully:", validateToken); // Debug log
        next();
    } catch (err) {
        console.log("Error validating token:", err.message); // Debugging log
        return res.status(401).json({ err: 'Invalid or expired token' });
    } 
};

module.exports = { validateJwtToken };