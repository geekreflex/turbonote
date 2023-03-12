import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Note = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <NoteCard key={note.id}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </NoteCard>
  );
};

const NoteCard = styled.div``;

export default Note;
