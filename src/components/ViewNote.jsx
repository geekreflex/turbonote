import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  removeSelectedNote,
  setSelectedNote,
  updateNote,
} from '../features/note/noteSlice';
import { Overlay } from '../styles/GlobalStyles';
import { serializeTimestamps } from '../utils/serializeTimestamp';
import Pin from './excerpts/Pin';
import Time from './excerpts/Time';
import NoteActions from './NoteActions';

const ViewNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localtion = useLocation();
  const noteId = localtion.hash.split('/')[1];
  const { note, notes } = useSelector((state) => state.note);
  const { view } = useSelector((state) => state.action);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (note) {
      <div className="right">o</div>;
      setTitle(note.title);
      setContent(note.content);
      setEditTitle(note.title);
      setEditContent(note.content);
    }
  }, [note, noteId]);

  useEffect(() => {
    if (notes.length > 0 && noteId) {
      dispatch(setSelectedNote(noteId));
    }
  }, [noteId, notes]);

  const handleUpdateNote = () => {
    const payload = {
      ...note,
      title,
      content,
    };
    dispatch(updateNote(payload));
  };

  const handleCloseNote = () => {
    dispatch(removeSelectedNote());
    navigate(`/note#${view}`);
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
            <Pin note={note} show={true} />
            <ViewData>
              <Title
                contentEditable={view === 'trash' ? false : true}
                onInput={(e) => setTitle(e.currentTarget.textContent)}
                onBlur={handleUpdateNote}
                suppressContentEditableWarning="true"
                data-placeholder="Title"
                id="title"
              >
                {editTitle}
              </Title>
              <Content
                contentEditable={view === 'trash' ? false : true}
                onInput={(e) => setContent(e.currentTarget.textContent)}
                onBlur={handleUpdateNote}
                suppressContentEditableWarning="true"
              >
                {editContent}
              </Content>
              <EditTime>
                <span id="edited">Edited</span>{' '}
                <Time time={serializeTimestamps(note?.updatedAt)} />
              </EditTime>
            </ViewData>
            <NoteActions note={note} show={true} />
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

  @media (max-width: 680px) {
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const ViewData = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 15px;
  border-radius: 20px;

  #title[data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #999;
  }
`;

const Title = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 400;
  color: #222;
`;
const Content = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  margin-bottom: 20px;
  line-height: 1.5rem;
  letter-spacing: 0.00625em;
  font-weight: 400;
  color: #333;
`;

const EditTime = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #444;
  gap: 3px;
  font-weight: 400;
`;
