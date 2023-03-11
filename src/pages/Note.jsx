import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../features/auth/authSlice';

const Note = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <div>
          <img src={user.photoURL} />
        </div>
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>
      <button onClick={() => dispatch(signOutUser())}>Logout</button>
    </div>
  );
};

export default Note;
