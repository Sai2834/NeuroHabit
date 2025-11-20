import React from 'react';
import { Shield, Zap, Crown, Star, Lock } from 'lucide-react';

const Badges = ({ totalCompleted }) => {
  const ranks = [
    { limit: 10, label: "Novice", icon: <Star size={16} />, color: "text-slate-400 border-slate-600" },
    { limit: 50, label: "Pro", icon: <Zap size={16} />, color: "text-blue-400 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" },
    { limit: 100, label: "Master", icon: <Shield size={16} />, color: "text-purple-400 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]" },
    { limit: 300, label: "Titan", icon: <Crown size={16} />, color: "text-yellow-400 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]" },
  ];

  // Find the next target
  const nextRank = ranks.find(r => totalCompleted < r.limit) || ranks[ranks.length - 1];
  const prevLimit = ranks[ranks.indexOf(nextRank) - 1]?.limit || 0;
  const progressToNext = Math.min(100, Math.max(0, ((totalCompleted - prevLimit) / (nextRank.limit - prevLimit)) * 100));

  return (
    <div className="bg-surface/50 p-4 rounded-2xl border border-zinc-800 mb-6">
      {/* Progress Header */}
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Next Rank: <span className="text-white">{nextRank.label}</span></span>
        <span className="text-xs text-primary font-mono">{totalCompleted} / {nextRank.limit} XP</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
          style={{ width: `${progressToNext}%` }}
        />
      </div>

      {/* Badges Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {ranks.map((rank) => {
          const isUnlocked = totalCompleted >= rank.limit;
          return (
            <div 
              key={rank.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-500 min-w-max
                ${isUnlocked 
                  ? `${rank.color} bg-zinc-900/80` 
                  : 'opacity-40 border-zinc-800 text-zinc-600 bg-transparent grayscale'}
              `}
            >
              {isUnlocked ? rank.icon : <Lock size={14} />}
              <span>{rank.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Badges;