const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const auth = require('../middleware/auth');

router.route('/')
    .get(auth, profileController.getProfile)
    .put(auth, profileController.updateProfile);

module.exports = router;
