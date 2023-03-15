import { createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
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
    addLabel: (state, action) => {
      state.labels.push(action.payload);
    },
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
  },
});

export const { addLabel, setLabels } = labelSlice.actions;

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

    dispatch(addLabel({ ...labelToAdd, id: 234 }));
  } catch (error) {
    console.error('Error creating label:', error);
  }
};

export const updateNote = (label) => async () => {
  try {
    await updateDoc(doc(db, 'labels', label.id), {
      ...label,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating label:', error);
  }
};

export default labelSlice.reducer;
