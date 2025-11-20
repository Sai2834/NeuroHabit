import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
// 4. Upload Avatar
export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async (base64Image, { rejectWithValue }) => {
  try {
    const response = await axios.put('/auth/avatar', { avatar: base64Image });
    return response.data; // Returns updated user
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
// 1. Load User (The "Remember Me" Feature)
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/auth/me');
    return response.data; // Returns user object { name, email, ... }
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// 2. Register
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// 3. Login
export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    token: localStorage.getItem('token'), 
    loading: true, // Start as loading to check for token
    isAuthenticated: false 
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load User
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        localStorage.removeItem('token'); // Token was bad, remove it
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      // Register & Login Success
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      builder
  .addCase(uploadAvatar.fulfilled, (state, action) => {
    state.user = action.payload; // Update user in state immediately
  });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;