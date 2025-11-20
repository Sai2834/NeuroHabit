const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Mind', 'Body', 'Sleep', 'Food', 'Custom'], default: 'Custom' },
  frequency: { type: String, default: 'Daily' },
  completedDates: [{ type: String }], // Store as YYYY-MM-DD strings
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', HabitSchema);