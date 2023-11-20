const msg = require('../schemas/message');
const sendMsg = async (text, sender, groupId) => {
    try {
        const message = new msg({ text, sender, groupId });
        const result = await message.save();
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

module.exports = {
    sendMsg
}