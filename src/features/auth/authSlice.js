import { createSlice } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../config/firebase';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const listenForAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      dispatch(setUser({ uid, displayName, email, photoURL }));
    } else {
      dispatch(setUser(null));
    }
  });
};

export const signInWithGoogle = () => (dispatch) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const { uid, displayName, email, photoURL } = result.user;
      dispatch(setUser({ uid, displayName, email, photoURL }));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signOutUser = () => (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(setUser(null));
    })
    .catch((error) => {
      console.error(error);
    });
};

export default authSlice.reducer;
