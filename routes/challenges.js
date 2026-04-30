const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges');
const auth = require('../middleware/auth');

router.use(auth);

router.route('/')
    .get(challengesController.getChallenges)
    .post(challengesController.createChallenge);

router.post('/:id/join', challengesController.joinChallenge);

module.exports = router;
