const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized, no token found' })
    }

    const token1 = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token1, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized, invalid token' })
    } 
}

module.exports = authMiddleware;