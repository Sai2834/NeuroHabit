import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react'; // Ensure you have lucide-react installed

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface p-8 rounded-3xl shadow-2xl border border-zinc-800"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-white tracking-tight">Welcome Back</h2>
        <p className="text-center text-zinc-500 mb-8 text-sm">Resume your protocol.</p>
        
        {/* ERROR ALERT BOX */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
          >
            <AlertTriangle size={18} className="text-red-500" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-bold uppercase ml-1">Email</label>
            <input 
              type="email" placeholder="titan@neurohabit.com" required
              className="w-full p-4 bg-zinc-900/50 rounded-xl border border-zinc-700 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-bold uppercase ml-1">Password</label>
            <input 
              type="password" placeholder="••••••••" required
              className="w-full p-4 bg-zinc-900/50 rounded-xl border border-zinc-700 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 mt-4"
          >
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          New here? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Initialize Protocol</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;