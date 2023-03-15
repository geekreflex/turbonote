import { createSlice } from '@reduxjs/toolkit';
import {} from 'firebase/firestore';
import { db } from '../../config/firebase';

const initialState = {
  addNoteModal: false,
  addLabelModal: false,
  view: 'note',
  errMessage: null,
  loading: false,
  mode: 'dark',
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
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);
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
    getThemeModeFromStroage: (state) => {
      const mode = localStorage.getItem('mode');
      state.mode = mode || 'light';
    },
  },
});

export const {
  toggleAddNote,
  toggleAddEditLabel,
  setView,
  setErrorMessage,
  clearErrorMessage,
  toggleThemeMode,
  getThemeModeFromStroage,
} = actionSlice.actions;

export const listenForNetworkChange = () => {};

export default actionSlice.reducer;
