const express = require('express');
const router = express.Router();
const {addUser, editUser} = require('../controllers/user');
const {signin,logout } = require('../controllers/index');
const authenticate = require('../middleware/authentication');
const admin = require('../middleware/admin');

router.post('/api/user/login', signin);
router.post('/api/user/logout', authenticate, logout);
router.post('/api/user/create', authenticate, admin, addUser);
router.put('/api/user/:userId', authenticate, admin, editUser);

module.exports = router;
