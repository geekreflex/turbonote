import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
import { signOutUser } from '../features/auth/authSlice';
import { listenForNotes } from '../features/note/noteSlice';

const Note = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(listenForNotes());
  }, []);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <div>
          <img src={user.photoURL} />
        </div>
        <h2>{user.displayName}</h2>
        <p>
          {user.email} - {user.uid}
        </p>
      </div>
      <button onClick={() => dispatch(signOutUser())}>Logout</button>
      <NoteList />
      <CreateNote />
    </div>
  );
};

export default Note;
