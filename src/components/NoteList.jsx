import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  removeSelectedNote,
  setSelectedNote,
} from '../features/note/noteSlice';
import Note from './Note';
import ViewNote from './ViewNote';

const NoteList = () => {
  const dispatch = useDispatch();
  const { notes, note } = useSelector((state) => state.note);
  const [selectedId, setSelectedId] = useState(null);

  const selectedNote = (noteId) => {
    setSelectedId(noteId);
    dispatch(setSelectedNote(noteId));
  };

  const removeNote = () => {
    setSelectedId(null);
    dispatch(removeSelectedNote());
  };

  return (
    <div>
      <NoteListWrap>
        {notes?.map((note) => (
          <motion.div
            layoutId={note.id}
            onClick={() => selectedNote(note.id)}
            key={note.id}
          >
            <Note note={note} />
          </motion.div>
        ))}
      </NoteListWrap>

      <ViewNote selectedId={selectedId} remove={removeNote} />
    </div>
  );
};

export default NoteList;

export const NoteListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 15px;
  list-style: none;
  margin-top: 20px;
`;
