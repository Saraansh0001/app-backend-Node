const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', challengesController.getChallenges);
router.post('/:id/join', challengesController.joinChallenge);

module.exports = router;
