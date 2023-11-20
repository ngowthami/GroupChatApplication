const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authentication');
const { createGroup, deleteGroup, addUsersIntoGrp, getAllUsers, search } = require('../controllers/group');

router.post('/api/group/create', authenticate, createGroup);
router.delete('/api/group/:groupId', authenticate, deleteGroup);
router.post('/api/group/:groupId/users', authenticate, addUsersIntoGrp)
router.get('/api/users/group/:groupId', authenticate, getAllUsers);
router.get('/api/groups/search', authenticate, search);

module.exports = router;
