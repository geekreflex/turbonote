import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './routes';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Note from './pages/Note';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenForAuthChanges } from './features/auth/authSlice';
import { listenForNotes } from './features/note/noteSlice';
import { listenForLabels } from './features/label/labelSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(listenForNotes());
      dispatch(listenForLabels());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, []);

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
          path="auth"
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
