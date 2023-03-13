import { createSlice } from '@reduxjs/toolkit';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { serializeTimestamps } from '../../utils/serializeTimestamp';

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
  },
});

export const { addLabel } = labelSlice.actions;

export const createLabel = (label) => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;

  try {
    const labelToAdd = {
      ...label,
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'labels'), labelToAdd);
    const serializedLabelData = serializeTimestamps({
      ...labelToAdd,
      id: docRef.id,
    });
    dispatch(addLabel({ serializedLabelData, id: 234 }));
  } catch (error) {
    console.error('Error creating label:', error);
  }
};

export default labelSlice.reducer;
