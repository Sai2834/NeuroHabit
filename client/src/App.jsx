import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './redux/authSlice';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return <div className="text-white text-center p-10">Loading NeuroHabit...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  // THE FIX: Load user on app start
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
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