const _ = require('lodash');
const admin = (req, res, next) => {
    try {
        if(!_.get(req, 'isAdmin')){
            console.log("🚀 ~ file: admin.js:5 ~ admin ~ req:", req.isAdmin)
            return res.status(401).json({message: "You do not have permisions to perform this activity"});
        }
        next();

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while updating the user.' });
    }
}

module.exports = admin