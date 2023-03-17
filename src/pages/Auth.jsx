import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { signInWithGoogle } from '../features/auth/authSlice';

const Auth = () => {
  const dispatch = useDispatch();
  return (
    <Layout>
      <h1>Auth</h1>
      <button onClick={() => dispatch(signInWithGoogle())}>
        Sign in with Google
      </button>
    </Layout>
  );
};

export default Auth;
