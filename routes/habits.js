const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const auth = require('../middleware/auth');

router.use(auth);

router.route('/')
    .get(habitsController.getHabits)
    .post(habitsController.createHabit);

router.route('/:id')
    .put(habitsController.updateHabit)
    .delete(habitsController.deleteHabit);

router.put('/:id/complete', habitsController.completeHabit);

module.exports = router;
