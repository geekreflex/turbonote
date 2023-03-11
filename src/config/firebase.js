import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyB-Dg_aXdfS0NZEZKlEZ7XBYZgjCK0Db-A',
  authDomain: 'quick-note-d222b.firebaseapp.com',
  projectId: 'quick-note-d222b',
  storageBucket: 'quick-note-d222b.appspot.com',
  messagingSenderId: '639778376945',
  appId: '1:639778376945:web:4f4088fa50faf4e589ad50',
  measurementId: 'G-ZZ5HDDG20Y',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const noteRef = collection(db, 'notes');
