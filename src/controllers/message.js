const MessageModel = require('../db/models/MessageModel');
const GroupModel = require('../db/models/GroupModel');
const sendMessage = async (req, res) => {
  try {
    const { text, sender } = req.body;
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    const isExist = await GroupModel.checkUser(groupId, userId);
    if (isExist && isExist.status === 'success') {
      const result = await MessageModel.sendMsg(text, sender, groupId);
      if (result && result.status === 'success') {
        return res.status(200).json({ message: "Message sent successfully" });
      } else {
        return res.status(400).json({ error: "Error during message sending" });
      }
    }
    return res.status(400).json({ error: 'User not exist in this group', message: 'You do not have permission to send message in this group' })
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while sending the message.' });
  }
};

module.exports = { sendMessage };
