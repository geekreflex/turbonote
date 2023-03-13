import { createSlice } from '@reduxjs/toolkit';
import {} from 'firebase/firestore';
import { db } from '../../config/firebase';

const initialState = {
  addNoteModal: false,
  addLabelModal: false,
};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    toggleAddNote: (state, action) => {
      state.addNoteModal = action.payload;
    },
    toggleAddEditLabel: (state, action) => {
      state.addLabelModal = action.payload;
    },
  },
});

export const { toggleAddNote, toggleAddEditLabel } = actionSlice.actions;

export const listenForNetworkChange = () => {};

export default actionSlice.reducer;
