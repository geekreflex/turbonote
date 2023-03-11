import React from 'react';
import CreateNote from '../components/CreateNote';
import LogoutButton from '../components/LogoutButton';

const Note = ({ notes }) => {
  return (
    <div>
      <h1>Note</h1>
      <LogoutButton />
      <CreateNote />
      <div>
        {notes.length > 0 &&
          notes.map((note) => <div key={note.id}>{note.title}</div>)}
      </div>
    </div>
  );
};

export default Note;
