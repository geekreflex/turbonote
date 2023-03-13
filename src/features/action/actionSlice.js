import { createSlice } from '@reduxjs/toolkit';
import {} from 'firebase/firestore';
import { db } from '../../config/firebase';

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

export const listenForNetworkChange = () => {};

export default actionSlice.reducer;
