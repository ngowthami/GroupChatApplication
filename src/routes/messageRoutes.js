const express = require('express');
const authenticate = require('../middleware/authentication');
const { sendMessage } = require('../controllers/message');

const router = express.Router();

router.post('/api/message/:groupId/users/:userId/send', authenticate, sendMessage);

module.exports = router;
