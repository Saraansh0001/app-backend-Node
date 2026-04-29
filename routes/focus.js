const express = require('express');
const router = express.Router();
const focusController = require('../controllers/focus');
const auth = require('../middleware/auth');

router.use(auth);

router.route('/')
    .get(focusController.getFocusSessions)
    .post(focusController.createFocusSession);

module.exports = router;
