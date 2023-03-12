import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateNote } from '../features/note/noteSlice';

const ViewNote = ({ selectedId, remove }) => {
  const dispatch = useDispatch();
  const { note } = useSelector((state) => state.note);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdateNote = () => {
    const payload = {
      id: note.id,
      data: { title, content },
    };
    dispatch(updateNote(payload));
    remove();
  };

  return (
    selectedId && (
      <AnimatePresence>
        <ViewNoteWrap
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="overlay"
            onClick={remove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
          />
          <ViewNoteMain
            as={motion.div}
            layoutId={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <motion.button onClick={handleUpdateNote}>
              Update Note
            </motion.button>
          </ViewNoteMain>
        </ViewNoteWrap>
      </AnimatePresence>
    )
  );
};

export default ViewNote;

const ViewNoteWrap = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewNoteMain = styled.div`
  position: relative;
  background: #ffffff;
  max-width: 500px;
  width: 500px;
  padding: 20;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  z-index: 9999;
`;
