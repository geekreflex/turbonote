import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addNote: false,
};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    toggleAddNote: (state, action) => {
      state.addNote = action.payload;
    },
  },
});

export const { toggleAddNote } = actionSlice.actions;
export default actionSlice.reducer;
