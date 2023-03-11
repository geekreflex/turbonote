import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { getDocs, query, where } from 'firebase/firestore';
import { auth, noteRef } from '../../config/firebase';

const initialState = {
  notes: null,
  status: 'idle',
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default noteSlice.reducer;
