const session = require('../../db/schemas/session');
const createSession = async (sessionData) => {
    try {
        const data = new session(sessionData);
        const result = await data.save();
        return {
            status: 'success',
            result: result
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const getUserSession = async (username) => {
    try {
        const user = await session.find({ username: username }).sort({ createdAt: -1 }).limit(1);
        return {
            status: 'success',
            user: user
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const deleteSession = async (token) => {
    try {
        const result = await session.deleteOne({ token: token });
        if (result && result.deletedCount > 0) {
            return {
                status: 'success'
            }
        } else {
            return {
                status: 'failed',
                error: 'Invalid Operation'
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
    createSession,
    getUserSession,
    deleteSession
}