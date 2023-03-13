import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddNote } from '../features/action/actionSlice';
import { createNote } from '../features/note/noteSlice';
import { Overlay } from '../styles/GlobalStyles';
import { AutoResizableTextarea } from './Expand';

const CreateNote = () => {
  const dispatch = useDispatch();
  const { addNote } = useSelector((state) => state.action);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    dispatch(createNote({ title, content }));
  };

  const closeModal = () => {
    dispatch(toggleAddNote(false));
  };

  return (
    <AnimatePresence>
      {addNote && (
        <CreateNoteWrap>
          <Overlay
            as={motion.div}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <CreateNoteMain
            as={motion.div}
            initial={{ scale: 0, y: 300 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 300 }}
            transition={{ duration: 0.5 }}
          >
            <NoteInput>
              <AutoResizableTextarea
                id="title"
                value={title}
                placeholder="Take a note"
                onChange={(e) => setTitle(e.target.value)}
              />
              <AutoResizableTextarea
                id="content"
                value={content}
                placeholder="Note content"
                onChange={(e) => setContent(e.target.value)}
              />
            </NoteInput>
            <NoteActions>
              <button onClick={handleCreateNote}>Create Note</button>
            </NoteActions>
          </CreateNoteMain>
        </CreateNoteWrap>
      )}
    </AnimatePresence>
  );
};

export default CreateNote;

const CreateNoteWrap = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
const CreateNoteMain = styled.div`
  position: relative;
  background-color: #fff;
  width: 600px;
  border-radius: 21px;
`;

const NoteInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 15px;

  textarea {
    border: none;
    outline: none;
    resize: none;
    line-height: 1;
    margin: 0;
  }

  #title {
    min-height: 20px;
    max-height: 100px;
    font-size: 20px;
    font-weight: 600;
  }

  #content {
    min-height: 80px;
    max-height: 200px;
    font-size: 15px;
    font-weight: 400;
  }
`;

const NoteActions = styled.div`
  height: 100px;
  padding: 0 50px;
`;
