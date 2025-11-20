import { motion } from 'framer-motion';
import { Check, Flame } from 'lucide-react';

const HabitCard = ({ habit, onToggle }) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completedDates.includes(today);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl flex items-center justify-between mb-3 transition-all duration-300 shadow-lg
        ${isCompleted ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-surface border border-slate-700'}
      `}
    >
      <div>
        <h3 className={`font-semibold text-lg ${isCompleted ? 'text-white' : 'text-slate-200'}`}>
          {habit.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-white/80">
            {habit.category}
          </span>
          {/* Loss Aversion Hook */}
          {habit.currentStreak > 0 && (
            <div className="flex items-center text-orange-400 text-xs font-bold animate-pulse">
              <Flame size={12} className="mr-1" />
              {habit.currentStreak} Day Streak! Don't break it!
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onToggle(habit._id)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
          ${isCompleted ? 'bg-white text-indigo-600' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}
        `}
      >
        {isCompleted ? <Check size={24} strokeWidth={3} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
      </button>
    </motion.div>
  );
};

export default HabitCard;