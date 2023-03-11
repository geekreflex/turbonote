import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../features/auth/authSlice';

const Auth = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Auth</h1>
      <button onClick={() => dispatch(signInWithGoogle())}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
