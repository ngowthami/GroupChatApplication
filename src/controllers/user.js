const _ = require('lodash');
const bcrypt = require('bcrypt');
const userModel = require('../db/models/UserModel');

const addUser = async (req, res) => {
    try {
        let payload = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(payload.password, saltRounds);
        payload.password = hashedPassword;
        const userResult = await userModel.getUserDetails(payload.username);
        if (userResult && userResult.userData.length > 0) {
            return res.status(400).json({ error: 'User already exists', message: 'The provided username or email is already in use.' });
        }
        const result = await userModel.createUser(payload);

        if (_.get(result, 'status') === 'success') {
            return res.status(200).send("User Added successful");
        } else {
            return res.status(400).json({ error: 'Error during creating user:', message: result.error });
        }
    } catch (error) {
        console.error('Error during creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred during signup.' });
    }
}

const editUser = async (req, res) => {
    try {
        const payload = req.body;
        if(_.get(payload, 'password')) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(payload.password, saltRounds);
            payload.password = hashedPassword;
        }
        const userId = req.params.userId;
        const data = await userModel.updateUser(userId, payload);
        if (_.get(data, 'status') === 'success') {
            return res.status(200).send(data);
        } else {
            return res.status(400).json({ error: 'Failed to update user', message: data.message });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while updating the user.' });
    }
}

module.exports = {
    addUser,
    editUser
}