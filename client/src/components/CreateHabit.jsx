import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../redux/habitSlice';
import { Plus, Zap } from 'lucide-react';

const CreateHabit = () => {
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    // Default to 'Custom' category for speed
    dispatch(addHabit({ title, category: 'Custom' }));
    setTitle('');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Habit
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-surface p-4 rounded-xl border border-indigo-500/50 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-3 text-indigo-400 text-sm font-semibold">
            <Zap size={16} /> New Behavioral Hook
          </div>
          <div className="flex gap-2">
            <input 
              autoFocus
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Read 10 pages..."
              className="flex-1 bg-background p-3 rounded-lg border border-slate-700 text-white outline-none focus:border-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-lg font-bold transition-colors">
              Add
            </button>
          </div>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="text-xs text-slate-500 mt-2 hover:text-slate-300"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateHabit;