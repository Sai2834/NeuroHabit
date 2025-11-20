import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// 1. Fetch Habits from DB
export const fetchHabits = createAsyncThunk('habits/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/habits');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// 2. Add New Habit to DB
export const addHabit = createAsyncThunk('habits/add', async (habitData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/habits', habitData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// 3. Toggle Completion in DB
export const toggleHabit = createAsyncThunk('habits/toggle', async ({ id, date }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/habits/${id}/toggle`, { date });
    return response.data; // Returns the updated habit
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const habitSlice = createSlice({
  name: 'habits',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Add
      .addCase(addHabit.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Add to top of list
      })
      // Toggle
      .addCase(toggleHabit.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default habitSlice.reducer;