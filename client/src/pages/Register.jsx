import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', mainGoal: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      navigate('/'); // Go to dashboard on success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-2xl border border-slate-700"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Join NeuroHabit</h2>
        <p className="text-center text-slate-400 mb-8">Hack your brain. Build your life.</p>
        
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Name" required
            className="w-full p-4 bg-background rounded-xl border border-slate-700 text-white focus:border-indigo-500 outline-none transition-colors"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email" required
            className="w-full p-4 bg-background rounded-xl border border-slate-700 text-white focus:border-indigo-500 outline-none transition-colors"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-4 bg-background rounded-xl border border-slate-700 text-white focus:border-indigo-500 outline-none transition-colors"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input 
            type="text" placeholder="Main Goal (e.g. Get Fit)" required
            className="w-full p-4 bg-background rounded-xl border border-slate-700 text-white focus:border-indigo-500 outline-none transition-colors"
            onChange={(e) => setFormData({...formData, mainGoal: e.target.value})}
          />
          
          <button 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-95"
          >
            {loading ? 'Processing...' : 'Start My Journey'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;