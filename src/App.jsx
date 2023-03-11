import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { auth } from './config/firebase';
import { clearAuthState, setUser } from './features/auth/authSlice';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Note from './pages/Note';
import { ProtectedRoute, PublicRoute } from './routes';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
              <Note />
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
