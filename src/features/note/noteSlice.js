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
import { setErrorMessage } from '../action/actionSlice';

const initialState = {
  notes: [],
  note: null,
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

    trashNoteSync: (state, action) => {
      const item = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === item.id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].trashed = item.trash;
        state.notes[noteIndex].pinned = false;
        state.notes[noteIndex].archived = false;
      }
    },
    setSelectedNote: (state, action) => {
      state.note = state.notes.find((note) => note.id === action.payload);
    },
    removeSelectedNote: (state) => {
      state.note = null;
    },
    getNotesFromStorage: (state, action) => {
      const json = localStorage.getItem('notes');
      state.notes = json ? JSON.parse(json) : [];
    },
  },
});

export const {
  setNotes,
  addNote,
  removeNote,
  setSelectedNote,
  removeSelectedNote,
  getNotesFromStorage,
  trashNoteSync,
} = noteSlice.actions;

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
        };
      });
      console.log('NOTES', notes);
      dispatch(setNotes(notes));
      localStorage.setItem('notes', JSON.stringify(notes));
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
      pinned: false,
      trashed: false,
      archived: false,
    };
    await addDoc(collection(db, 'notes'), noteToAdd);

    dispatch(addNote({ ...noteToAdd, id: 234 }));
  } catch (error) {
    console.error('Error creating note:', error);
  }
};

export const updateNote = (note) => async () => {
  try {
    console.log('here... Again');
    await updateDoc(doc(db, 'notes', note.id), {
      ...note,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating note:', error);
  }
};

export const updateNoteLabel = (note) => async () => {
  try {
    await updateDoc(doc(db, 'notes', note.id), {
      ...note,
    });
  } catch (error) {
    console.error('Error updating note label:', error);
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

export const pinNote = (note) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'notes', note.id), {
      ...note,
      archived: false,
    });
  } catch (error) {
    console.error('Error pinning note:', error);
  }
};

export const archiveNote = (note) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'notes', note.id), {
      ...note,
      pinned: false,
    });
    dispatch(
      setErrorMessage(`Note ${note.archived ? 'archived' : 'unarchived'}`)
    );
  } catch (error) {
    console.error('Error archiving note:', error);
  }
};

export const trashNote = (note) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'notes', note.id), {
      ...note,
      pinned: false,
      archived: false,
    });
    // dispatch(trashNoteSync(note));
  } catch (error) {
    console.error('Error trashing note:', error);
  }
};

export default noteSlice.reducer;
