const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal');
const auth = require('../middleware/auth');

router.use(auth);

router.route('/')
    .get(journalController.getJournalEntries)
    .post(journalController.createJournalEntry);

module.exports = router;
