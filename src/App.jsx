import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { auth, noteRef } from './config/firebase';
import { clearAuthState, setUser } from './features/auth/authSlice';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Note from './pages/Note';
import { ProtectedRoute, PublicRoute } from './routes';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const q = query(noteRef, where('userId', '==', user.uid));
      const unsub = onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
          console.log({ ...doc.data(), id: doc.id });
          items.push({ ...doc.data(), id: doc.id });
        });
        setNotes(items);
        console.log(items);
      });

      return () => unsub();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(clearAuthState(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch, auth]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="note"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Note notes={notes} />
            </ProtectedRoute>
          }
        />
        <Route
          path="enter"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Auth />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
