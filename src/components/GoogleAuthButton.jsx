import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../features/auth/authSlice';

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const handleSignInClick = () => {
    dispatch(signInWithGoogle());
  };
  return <button onClick={handleSignInClick}>Sign in with Google</button>;
};

export default GoogleAuthButton;
