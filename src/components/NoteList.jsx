import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Note from './Note';

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <NoteListWrap>
        {notes.map((note) => (
          <motion.div layoutId={note.id} onClick={() => setSelectedId(note.id)}>
            <Note note={note} key={note.id} />
          </motion.div>
        ))}
      </NoteListWrap>
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{'Hi everyone'}</motion.h5>
            <motion.h2>{'This is a logn cone'}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)}>
              click
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
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
