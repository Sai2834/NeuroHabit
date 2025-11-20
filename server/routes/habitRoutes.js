const express = require('express');
const router = express.Router();
const { getHabits, createHabit, toggleHabit } = require('../controllers/habitController');
const auth = require('../middleware/auth');

router.get('/', auth, getHabits);
router.post('/', auth, createHabit);
router.put('/:id/toggle', auth, toggleHabit);

module.exports = router;