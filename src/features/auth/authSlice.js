import { createSlice } from '@reduxjs/toolkit';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../config/firebase';

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isLoggedIn', true);
    },
    clearUserAuth: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    },
    checkUserAuthStorage: (state) => {
      state.isLoggedIn = localStorage.getItem('isLoggedIn') || false;
      state.user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;
    },
  },
});

export const { setUserAuth, clearUserAuth, checkUserAuthStorage } =
  authSlice.actions;

export const listenForAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      dispatch(setUserAuth({ uid, displayName, email, photoURL }));
    } else {
      dispatch(clearUserAuth(null));
      localStorage.removeItem('notes');
    }
  });
};

export const signInWithTest =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      // dispatch(setUser(user));
    } catch (error) {
      // dispatch(setError(error.message));
    }
  };

export const signInWithGoogle = () => (dispatch) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const { uid, displayName, email, photoURL } = result.user;
      dispatch(setUserAuth({ uid, displayName, email, photoURL }));
    })
    .catch((error) => {
      dispatch(clearUserAuth(error.message));
    });
};

export const signInWithFacebook = () => (dispatch) => {
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const { uid, displayName, email, photoURL } = result.user;
      dispatch(setUserAuth({ uid, displayName, email, photoURL }));
    })
    .catch((error) => {
      dispatch(clearUserAuth(error.message));
    });
};

export const signOutUser = () => (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(clearUserAuth(null));
      localSorage.removeItem('isLoggedIn');
      localStorage.removeItem('labels');
      localSorage.removeItem('notes');
    })
    .catch((error) => {
      dispatch(clearUserAuth(error.message));
    });
};

export default authSlice.reducer;
