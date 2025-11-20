const express = require('express');
const router = express.Router();
const { register, login, getMe, updateAvatar } = require('../controllers/authController'); 
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/avatar', auth, updateAvatar);

module.exports = router;