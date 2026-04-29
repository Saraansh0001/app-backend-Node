const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const auth = require('../middleware/auth');

router.get('/', auth, profileController.getProfile);

module.exports = router;
