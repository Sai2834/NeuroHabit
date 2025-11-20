import React from 'react';
import { format, subDays } from 'date-fns';

const Heatmap = ({ habits }) => {
  // Generate last 28 days (4 weeks)
  const days = Array.from({ length: 28 }, (_, i) => {
    const date = subDays(new Date(), 27 - i); // From 27 days ago to today
    return format(date, 'yyyy-MM-dd');
  });

  const getIntensity = (date) => {
    // Calculate how many habits were done on this specific date
    let completedCount = 0;
    let totalHabits = habits.length;
    
    if (totalHabits === 0) return 'bg-zinc-800'; // No habits exists

    habits.forEach(habit => {
      if (habit.completedDates.includes(date)) completedCount++;
    });

    const percentage = (completedCount / totalHabits);

    // LeetCode Logic: Darker color = More work done
    if (completedCount === 0) return 'bg-zinc-800'; // Empty
    if (percentage <= 0.4) return 'bg-emerald-900/40'; // Light effort
    if (percentage <= 0.7) return 'bg-emerald-600/60'; // Good effort
    return 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'; // PERFECT (Glowing)
  };

  return (
    <div className="bg-surface p-5 rounded-2xl border border-zinc-800 shadow-lg mb-6">
      <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Consistency Map (Last 30 Days)</h4>
      <div className="flex flex-wrap gap-2 justify-center">
        {days.map(date => (
          <div 
            key={date} 
            title={date}
            className={`w-8 h-8 rounded-md transition-all duration-500 hover:scale-110 cursor-pointer ${getIntensity(date)}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-zinc-500 mt-3 px-2">
        <span>Less</span>
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;