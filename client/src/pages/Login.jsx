import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-2xl border border-slate-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</h2>
        
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" placeholder="Email" required
            className="w-full p-4 bg-background rounded-xl border border-slate-700 text-white focus:border-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-4 bg-background rounded-xl border border-slate-700 text-white focus:border-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all"
          >
            {loading ? 'Checking Credentials...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          New here? <Link to="/register" className="text-indigo-400 hover:underline">Create account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;