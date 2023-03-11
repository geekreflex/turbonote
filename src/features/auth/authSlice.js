import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isLoggedIn: false,
};

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true);
    },
    clearAuthState(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
    },
    isLoggedInFromStorage(state) {
      state.isLoggedIn = localStorage.getItem('isLoggedIn') || false;
    },
  },
  extraReducers: {
    // Google Auth
    [signInWithGoogle.pending]: (state) => {
      state.status = 'pending';
    },
    [signInWithGoogle.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true);
    },
    [signInWithGoogle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { setUser, clearAuthState, isLoggedInFromStorage } =
  authSlice.actions;
export default authSlice.reducer;
