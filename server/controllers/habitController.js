const Habit = require('../models/Habit');

// Get all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add Habit
exports.createHabit = async (req, res) => {
  const { title, category } = req.body;
  try {
    const newHabit = new Habit({
      title,
      category,
      user: req.user.id,
      completedDates: [],
      currentStreak: 0
    });
    const habit = await newHabit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update streak and completion status
exports.toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ msg: 'Habit not found' });

    const { date } = req.body; // The date passed from frontend (e.g., "2023-10-27")

    // Check if this date is already in the completed list
    const index = habit.completedDates.indexOf(date);
    
    if (index === -1) {
      // CASE 1: Mark as Done
      habit.completedDates.push(date);
      
      // Simple Streak Logic: If they did it today, add 1 to streak!
      // (In a real app, we would check if they did it yesterday too)
      habit.currentStreak += 1; 
    } else {
      // CASE 2: Un-mark (Undo)
      habit.completedDates.splice(index, 1);
      
      // Decrease streak but don't go below 0
      habit.currentStreak = Math.max(0, habit.currentStreak - 1);
    }
    
    await habit.save();
    res.json(habit); // Send back the updated habit
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteHabit = async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Habit removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};