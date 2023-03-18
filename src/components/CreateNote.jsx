import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddNote } from '../features/action/actionSlice';
import { createNote } from '../features/note/noteSlice';
import { ButtonIconSm, CloseBtn, Overlay } from '../styles/GlobalStyles';
import { AutoResizableTextarea } from './Expand';
import LabelIcon from './icons/LabelIcon';
import Labels from './Labels';
import OutsideClickHandler from 'react-outside-click-handler';

const CreateNote = () => {
  const dispatch = useDispatch();
  const { addNoteModal } = useSelector((state) => state.action);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleCreateNote = (e) => {
    e.preventDefault();
    const payload = {
      title,
      content,
      labels: selectedLabels,
    };
    if (content !== '' || title !== '') {
      dispatch(createNote(payload));
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
            onClick={handleCreateNote}
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
                <ButtonIconSm onClick={() => setShowLabels(true)}>
                  <LabelIcon />
                </ButtonIconSm>
              </div>
              <div className="right">
                <CloseBtn onClick={handleCreateNote}>
                  {content || title ? 'Save' : 'Close'}
                </CloseBtn>
              </div>
            </NoteActions>
            <OutsideClickHandler onOutsideClick={() => setShowLabels(false)}>
              {showLabels && (
                <Labels
                  selectedLabels={selectedLabels}
                  setSelectedLabels={setSelectedLabels}
                />
              )}
            </OutsideClickHandler>
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
  background-color: ${(props) => props.theme.colors.cardBg};
  width: 600px;
  border-radius: 21px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.colors.shadow2};
  @media (max-width: 600px) {
    height: 100vh;
    width: 100%;
    border-radius: 0;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }
  display: flex;
  flex-direction: column;
`;

const NoteInput = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  overflow: hidden;
  flex: 1;

  textarea {
    border: none;
    outline: none;
    resize: none;
    line-height: 1.5;
    margin: 0;
    overflow-y: auto !important;
    padding: 0 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text2};
    background-color: transparent;
  }

  #title {
    min-height: 20px;
    max-height: 100px;
    font-size: 17px;
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
