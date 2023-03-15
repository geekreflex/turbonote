import { createSlice } from '@reduxjs/toolkit';
import {} from 'firebase/firestore';
import { db } from '../../config/firebase';

const initialState = {
  addNoteModal: false,
  addLabelModal: false,
  view: 'note',
  errMessage: null,
  loading: false,
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
    setErrorMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errMessage = null;
    },
  },
});

export const {
  toggleAddNote,
  toggleAddEditLabel,
  setView,
  setErrorMessage,
  clearErrorMessage,
} = actionSlice.actions;

export const listenForNetworkChange = () => {};

export default actionSlice.reducer;
