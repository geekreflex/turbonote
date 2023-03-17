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

const initialState = {
  labels: [],
};

const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    getLabelsFromStorage: (state) => {
      const json = localStorage.getItem('labels');
      state.labels = json ? JSON.parse(json) : [];
    },
  },
});

export const { setLabels, getLabelsFromStorage } = labelSlice.actions;

export const listenForLabels = () => (dispatch, getState) => {
  try {
    const { isLoggedIn } = getState().auth;

    if (!isLoggedIn) {
      return;
    }

    const uid = getState().auth.user.uid;

    const q = query(
      collection(db, 'labels'),
      where('userId', '==', uid),
      orderBy('createdAt')
    );
    onSnapshot(q, (snapshot) => {
      const labels = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      dispatch(setLabels(labels));
      localStorage.setItem('labels', JSON.stringify(labels));
    });
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const createLabel = (label) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;

  try {
    const labelToAdd = {
      ...label,
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(collection(db, 'labels'), labelToAdd);
  } catch (error) {
    console.error('Error creating label:', error);
  }
};

export const updateLabel = (label) => async () => {
  try {
    await updateDoc(doc(db, 'labels', label.id), {
      ...label,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating label:', error);
  }
};

export const deleteLabel = (labelId) => async () => {
  try {
    await deleteDoc(doc(db, 'labels', labelId));
  } catch (error) {
    console.error(`Error deleting label:`, error);
  }
};

export default labelSlice.reducer;
