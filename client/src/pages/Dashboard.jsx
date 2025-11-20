import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits, toggleHabit } from '../redux/habitSlice';
import { logout, uploadAvatar } from '../redux/authSlice';
import HabitCard from '../components/HabitCard';
import CreateHabit from '../components/CreateHabit';
import Heatmap from '../components/Heatmap';
import Badges from '../components/Badges';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Confetti from 'react-confetti';
import { Check, Camera, Quote } from 'lucide-react';
import { useWindowSize } from 'react-use';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();
  const { user } = useSelector((state) => state.auth);
  const { items: habits } = useSelector((state) => state.habits);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // REFS FOR FILE UPLOAD
  const fileInputRef = useRef(null);

  // QUOTES ARRAY
  const quotes = [
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "Discipline is choosing between what you want now and what you want most.",
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Your future is created by what you do today, not tomorrow.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started."
  ];
  const [dailyQuote, setDailyQuote] = useState(quotes[0]);

  useEffect(() => {
    dispatch(fetchHabits());
    // Pick random quote on load
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [dispatch]);

  const handleToggle = (id) => {
    const today = new Date().toISOString().split('T')[0];
    dispatch(toggleHabit({ id, date: today }));
  };

  // IMAGE UPLOAD LOGIC
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(uploadAvatar(reader.result)); 
      };
    }
  };

  // Stats Logic
  const todayStr = new Date().toISOString().split('T')[0];
  const completedCount = habits.filter(h => h.completedDates && h.completedDates.includes(todayStr)).length;
  const totalHabits = habits.length;
  const percentage = totalHabits === 0 ? 0 : Math.round((completedCount / totalHabits) * 100);
  const lifetimeCompletions = habits.reduce((acc, habit) => acc + habit.completedDates.length, 0);

  useEffect(() => {
    if (percentage === 100 && totalHabits > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [percentage, totalHabits]);

  const chartData = [{ name: 'Done', value: completedCount }, { name: 'Remaining', value: totalHabits - completedCount }];

  return (
    <div className="min-h-screen bg-background text-white p-6 font-sans selection:bg-primary selection:text-black">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} colors={['#10b981', '#8b5cf6', '#f59e0b']} />}

      {/* --- NAVBAR (FIXED: Quote is always visible) --- */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 mb-8 pb-4 border-b border-zinc-800">
        
        {/* Top Row: User & Logout */}
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                {/* AVATAR UPLOAD AREA */}
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                    {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg group-hover:shadow-indigo-500/50 transition-all">
                            {user?.name?.[0] || 'T'}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={16} className="text-white" />
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">{user?.name || 'Titan'}</h1>
                    <p className="text-muted text-xs font-medium tracking-wide uppercase flex items-center gap-2">
                        {format(new Date(), 'EEEE, MMM do')}
                    </p>
                </div>
            </div>

            <button onClick={() => dispatch(logout())} className="text-xs bg-zinc-800 text-zinc-400 hover:text-white hover:bg-red-500/20 px-5 py-2 rounded-lg transition-all border border-zinc-700">
              Sign Out
            </button>
        </div>

        {/* Bottom Row: QUOTE SECTION (Click to shuffle) */}
        <div 
            onClick={() => setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)])}
            className="flex items-center justify-center gap-3 bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-800/50 cursor-pointer hover:bg-zinc-800/50 transition-all group"
        >
            <Quote size={14} className="text-indigo-500 group-hover:scale-110 transition-transform" />
            <p className="text-sm text-zinc-400 italic text-center group-hover:text-zinc-300">"{dailyQuote}"</p>
        </div>

      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
            <div className="relative bg-surface p-8 rounded-3xl border border-zinc-800 shadow-xl overflow-hidden">
                <div className="flex flex-col items-center justify-center z-10 relative">
                    <div className="w-48 h-48 relative mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={chartData} innerRadius={60} outerRadius={75} startAngle={90} endAngle={-270} paddingAngle={5} dataKey="value" stroke="none" cornerRadius={10}>
                                    <Cell fill="#10b981" /> <Cell fill="#27272a" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {percentage === 100 ? (
                                <div className="bg-emerald-500/20 p-3 rounded-full animate-in zoom-in duration-300">
                                    <Check size={48} className="text-emerald-400" strokeWidth={3} />
                                </div>
                            ) : (
                                <><span className="text-4xl font-black text-white">{percentage}%</span><span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Done</span></>
                            )}
                        </div>
                    </div>
                    <p className="text-zinc-400 text-sm font-medium text-center">
                        {percentage === 100 ? "Protocol Complete. Great work." : `${completedCount} of ${totalHabits} habits completed`}
                    </p>
                </div>
            </div>
            <Badges totalCompleted={lifetimeCompletions} />
            <Heatmap habits={habits} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8">
            <div className="bg-surface/30 p-6 rounded-3xl border border-zinc-800/50 min-h-[500px]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        Daily Protocol <span className="text-sm font-normal text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">{habits.length} Active</span>
                    </h2>
                </div>
                <CreateHabit />
                <div className="space-y-4 mt-6">
                    {habits.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
                            <p className="text-zinc-500">No active habits.</p>
                        </div>
                    )}
                    {habits.map(habit => (
                        <HabitCard key={habit._id} habit={habit} onToggle={handleToggle} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;