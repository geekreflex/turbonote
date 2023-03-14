import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddNote } from '../features/action/actionSlice';
import { createNote } from '../features/note/noteSlice';
import { ButtonIconSm, CloseBtn, Overlay } from '../styles/GlobalStyles';
import { AutoResizableTextarea } from './Expand';
import LabelIcon from './icons/LabelIcon';

const CreateNote = () => {
  const dispatch = useDispatch();
  const { addNoteModal } = useSelector((state) => state.action);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (content !== '') {
      dispatch(createNote({ title, content }));
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(toggleAddNote(false));
    setTitle('');
    setContent('');
  };

  return (
    <AnimatePresence>
      {addNoteModal && (
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
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <AutoResizableTextarea
                id="content"
                value={content}
                placeholder="Take a note..."
                onChange={(e) => setContent(e.target.value)}
              />
            </NoteInput>
            <NoteActions>
              <div className="left">
                <ButtonIconSm>
                  <LabelIcon />
                </ButtonIconSm>
              </div>
              <div className="right">
                <CloseBtn onClick={handleCreateNote}>Close</CloseBtn>
              </div>
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px, 0 0px 1px 1px #eee;
  @media (max-width: 680px) {
    height: 100vh;
    border-radius: 0;
  }
`;

const NoteInput = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  overflow: hidden;

  textarea {
    border: none;
    outline: none;
    resize: none;
    line-height: 1.5;
    margin: 0;
    overflow-y: auto !important;
    padding: 0 20px;
    font-weight: 600;
  }

  #title {
    min-height: 20px;
    max-height: 100px;
    font-size: 16px;
  }

  #content {
    min-height: 50px;
    height: 20px;
    max-height: 60vh;
    font-size: 15px;
    overflow-y: auto;
    /* padding-bottom: 30px; */
  }
`;

const NoteActions = styled.div`
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    align-items: center;
  }
`;
