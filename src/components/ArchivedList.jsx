import React from 'react';
import { useSelector } from 'react-redux';
import Empty from './Empty';
import Note from './Note';
import NotesWrap from './NotesWrap';

const ArchivedList = () => {
  const { notes } = useSelector((state) => state.note);
  const archivedNotes = notes.filter((note) => note.archived);

  if (archivedNotes.length === 0) {
    return <Empty type="archive" />;
  }

  return (
    <NotesWrap>
      {archivedNotes?.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </NotesWrap>
  );
};

export default ArchivedList;
