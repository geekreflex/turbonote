import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../config/firebase';

const LogoutButton = () => {
  const handleLogoutClick = () => {
    signOut(auth).then(() => {
      console.log('user is logged out');
    });
  };
  return <button onClick={handleLogoutClick}>Log out</button>;
};

export default LogoutButton;
