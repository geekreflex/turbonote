import { createSlice } from '@reduxjs/toolkit';
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    //
    addNote: (state, action) => {
      // state.notes = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = noteSlice.actions;

export const listenForNotes = () => (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const q = query(collection(db, 'notes'), where('userId', '==', uid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().getTime() : null,
        updatedAt: data.createdAt ? data.createdAt.toDate().getTime() : null,
      };
    });
    dispatch(setNotes(notes));
  });
  return unsubscribe;
};

export default noteSlice.reducer;
