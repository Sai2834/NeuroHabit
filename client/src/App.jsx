import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from './redux/authSlice';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

// Security Guard
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  // Show loading screen while checking auth
  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-white">
      <div className="animate-pulse text-xl font-mono text-indigo-400">Loading NeuroHabit...</div>
    </div>
  );
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    } else {
      // FIX: If no token, explicitly set loading to false so Login page appears
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;