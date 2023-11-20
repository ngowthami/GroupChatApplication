const jwt = require('jsonwebtoken');
const sessionModel = require('../db/models/SessionModel');
const authenticate = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token.' });
        }
        let getUserSession = await sessionModel.getUserSession(decoded.username);
        const isTokenExpired = Date.now() >= decoded.exp * 1000;
        if (isTokenExpired) {
            return res.status(401).json({ message: 'Token expired' });
        }
        req.isAdmin = getUserSession.user[0].isAdmin;
        next();
    });
}


module.exports = authenticate;
