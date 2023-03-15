import React from 'react';
import Note from './Note';
import { useSelector } from 'react-redux';
import NotesWrap from './NotesWrap';
import Empty from './Empty';

const TrashedList = () => {
  const { notes } = useSelector((state) => state.note);
  const trashedNotes = notes.filter((note) => note.trashed);

  if (trashedNotes.length === 0) {
    return <Empty type="trash" />;
  }

  return (
    <NotesWrap>
      {trashedNotes?.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </NotesWrap>
  );
};

export default TrashedList;
