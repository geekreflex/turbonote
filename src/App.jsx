import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './routes';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Note from './pages/Note';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenForAuthChanges } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/note"
          element={
            <ProtectedRoute>
              <Note />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
