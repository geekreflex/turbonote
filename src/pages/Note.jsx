import React from 'react';
import CreateNote from '../components/CreateNote';
import LogoutButton from '../components/LogoutButton';

const Note = () => {
  return (
    <div>
      <h1>Note</h1>
      <LogoutButton />
      <CreateNote />
    </div>
  );
};

export default Note;
