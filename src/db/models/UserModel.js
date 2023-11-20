const user = require('../schemas/user')
const createUser = async (data) => {
    try {
        const newUser = new user(data);
        const result = await newUser.save();
        return {
            status: 'success',
            result: result
        }
    } catch (error) {
        return {
            status: 'fail',
            error: error
        }
    }
}

const updateUser = async (userId, data) => {
    try {
        let query = {};
        let updateObj = {};
        if (userId) {
            query._id = userId
        }
        if (data.username) {
            updateObj.username = data.username;
        }
        if (data.password) {
            updateObj.password = data.password;
        }
        if(data.isAdmin !== undefined){
            updateObj.isAdmin = data.isAdmin;
        }
        const result = await user.updateOne(query, { $set:  updateObj });
        if (result) {
            const updatedUserData = await user.find({ username: data.username });
            return {
                status: 'success',
                result: updatedUserData
            }
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const getUserDetails = async (username) => {
    try {
        const userDetails = await user.find({ username: username });
        if (userDetails && userDetails.length > 0) {
            return {
                status: 'success',
                userData: userDetails
            }
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}
module.exports = {
    createUser,
    updateUser,
    getUserDetails
}