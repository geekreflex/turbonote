import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeSelectedNote, updateNote } from '../features/note/noteSlice';
import { Overlay } from '../styles/GlobalStyles';

const ViewNote = () => {
  const dispatch = useDispatch();
  const { note } = useSelector((state) => state.note);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setEditTitle(note.title);
      setEditContent(note.content);
    }
  }, [note]);

  const handleUpdateNote = () => {
    const payload = {
      id: note.id,
      data: { title, content },
    };
    dispatch(updateNote(payload));
  };

  const handleCloseNote = () => {
    dispatch(removeSelectedNote());
  };

  return (
    <AnimatePresence>
      {note && (
        <ViewNoteWrap>
          <Overlay
            onClick={handleCloseNote}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <ViewNoteMain
            as={motion.div}
            initial={{ scale: 0, y: -600 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -600 }}
            transition={{ duration: 0.5 }}
          >
            <ViewData>
              <Title
                contentEditable={true}
                onInput={(e) => setTitle(e.currentTarget.textContent)}
                onBlur={handleUpdateNote}
                suppressContentEditableWarning="true"
              >
                {editTitle}
              </Title>
              <Content
                contentEditable={true}
                onInput={(e) => setContent(e.currentTarget.textContent)}
                onBlur={handleUpdateNote}
                suppressContentEditableWarning="true"
              >
                {editContent}
              </Content>
            </ViewData>
            <ViewActions>
              <button onClick={handleUpdateNote}>Update Note</button>
            </ViewActions>
          </ViewNoteMain>
        </ViewNoteWrap>
      )}
    </AnimatePresence>
  );
};

export default ViewNote;

const ViewNoteWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const ViewNoteMain = styled.div`
  max-height: 90vh;
  width: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const ViewData = styled.div`
  overflow-y: scroll;
  flex: 1;
  padding: 10px;
  border-radius: 20px;
`;
const ViewActions = styled.div`
  height: 70px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
`;

const Title = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  margin-bottom: 20px;
  font-size: 25px;
`;
const Content = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  margin-bottom: 20px;
  line-height: 1.5rem;
  letter-spacing: 0.00625em;
  font-weight: 400;
`;
