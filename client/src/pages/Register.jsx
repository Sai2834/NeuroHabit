import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', mainGoal: '' });
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear previous local errors

    // 1. CLIENT SIDE VALIDATION
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface p-8 rounded-3xl shadow-2xl border border-zinc-800"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-white tracking-tight">Join NeuroHabit</h2>
        <p className="text-center text-zinc-500 mb-8 text-sm">Hack your brain. Build your life.</p>
        
        {/* ERROR ALERT BOX (Shows Backend Error OR Local Password Error) */}
        {(error || localError) && (
          <motion.div 
             initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
             className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
          >
            <AlertTriangle size={18} className="text-red-500" />
            <span>{localError || error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-bold uppercase ml-1">Full Name</label>
            <input 
              type="text" placeholder="Titan" required
              className="w-full p-4 bg-zinc-900/50 rounded-xl border border-zinc-700 text-white focus:border-indigo-500 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-bold uppercase ml-1">Email</label>
            <input 
              type="email" placeholder="titan@neurohabit.com" required
              className="w-full p-4 bg-zinc-900/50 rounded-xl border border-zinc-700 text-white focus:border-indigo-500 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-bold uppercase ml-1">Password</label>
            <input 
              type="password" placeholder="Min 6 characters" required
              className="w-full p-4 bg-zinc-900/50 rounded-xl border border-zinc-700 text-white focus:border-indigo-500 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-bold uppercase ml-1">Main Goal</label>
            <input 
              type="text" placeholder="e.g. Get Fit, Learn MERN" required
              className="w-full p-4 bg-zinc-900/50 rounded-xl border border-zinc-700 text-white focus:border-indigo-500 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, mainGoal: e.target.value})}
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/20 mt-2"
          >
            {loading ? 'Creating ID...' : 'Start My Journey'}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;