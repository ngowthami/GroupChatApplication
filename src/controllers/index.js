const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const userModel = require('../db/models/UserModel');
const sessionModel = require('../db/models/SessionModel');
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await userModel.getUserDetails(username);
        if (result && result.status === 'success') {
            decryptedPassword = await bcrypt.compare(password, result.userData[0].password);
            if (decryptedPassword) {
                const token = jwt.sign({ username: username, isAdmin: result.userData[0].isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })
                const session = {
                    _id: `s-${uuidv4()}`,
                    token,
                    username,
                    isAdmin: result.userData[0].isAdmin
                }
                await sessionModel.createSession(session);
                return res.status(200).json({ status: 'success', message: 'Login successful', token: session.token });
            } else {
                return res.status(401).json({ status: 'error', message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.log('Error during login:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const result = await sessionModel.deleteSession(token);
        if(_.get(result, 'status') === 'success'){
            return res.status(200).json({ status: 'success', message: 'Logout successfully' });
        } else {
            return res.status(404).json({ status: 'error', message: 'Invalid operation' });
        }
    } catch (error) {
        console.log('Error during logout:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

module.exports = {
    signin,
    logout
}