import { createSlice } from '@reduxjs/toolkit';
import {} from 'firebase/firestore';
import { db } from '../../config/firebase';

const initialState = {
  addNoteModal: false,
  addLabelModal: false,
  view: 'note',
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
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { toggleAddNote, toggleAddEditLabel, setView } =
  actionSlice.actions;

export const listenForNetworkChange = () => {};

export default actionSlice.reducer;
