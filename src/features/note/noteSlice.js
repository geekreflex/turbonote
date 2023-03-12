import { createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { serializeTimestamps } from '../../utils/serializeTimestamp';

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { setNotes, addNote, removeNote } = noteSlice.actions;

export const listenForNotes = () => (dispatch, getState) => {
  try {
    const { isLoggedIn } = getState().auth;

    if (!isLoggedIn) {
      return;
    }

    const uid = getState().auth.user.uid;

    const q = query(
      collection(db, 'notes'),
      where('userId', '==', uid),
      orderBy('createdAt')
    );
    onSnapshot(q, (snapshot) => {
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
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const createNote = (note) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;

  try {
    const noteToAdd = {
      ...note,
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'notes'), noteToAdd);
    const serializeNoteData = serializeTimestamps({
      ...noteToAdd,
      id: docRef.id,
    });
    dispatch(addNote(serializeNoteData));
  } catch (error) {
    console.error('Error creating note:', error);
  }
};

export const updateNote = (id, update) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'notes', id), update);
    dispatch();
  } catch (error) {
    console.error('Error updateing note:', error);
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'notes', noteId));
    dispatch(removeNote(noteId));
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

export default noteSlice.reducer;
