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
import Pin from './excerpts/Pin';
import Time from './excerpts/Time';
import Labels from './Labels';
import NoteActions from './NoteActions';
import OutsideClickHandler from 'react-outside-click-handler';

const ViewNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localtion = useLocation();
  const noteId = location.hash && localtion.hash.split('/')[1];
  const { note } = useSelector((state) => state.note);
  const { view } = useSelector((state) => state.action);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showLabels, setShowLabels] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setEditTitle(note.title);
      setEditContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (noteId) {
      dispatch(setSelectedNote(noteId));
    }
  }, [noteId]);

  const handleUpdateNote = () => {
    const payload = {
      ...note,
      title,
      content,
    };
    dispatch(updateNote(payload));
  };

  const handleInputChange = (type, value) => {
    setIsEditing(true);
    if (type === 'title') {
      setTitle(value);
    }

    if (type === 'content') {
      setContent(value);
    }
  };

  const handleCloseNote = () => {
    const hash = localStorage.getItem('hash');
    navigate(hash ? `/note${hash}` : `/note#${view}`);
    if (isEditing) {
      handleUpdateNote();
    }
    setIsEditing(false);
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
            {/* <Pin note={note} show={true} /> */}
            <ViewData>
              <Title
                contentEditable={view === 'trash' ? false : true}
                onInput={(e) =>
                  handleInputChange('title', e.currentTarget.innerText)
                }
                suppressContentEditableWarning="true"
                data-placeholder="Title"
                id="title"
              >
                {editTitle}
              </Title>
              <Content
                contentEditable={view === 'trash' ? false : true}
                onInput={(e) =>
                  handleInputChange('content', e.currentTarget.innerText)
                }
                suppressContentEditableWarning="true"
                aria-multiline="true"
                role="textbox"
                dir="ltr"
                tabIndex="0"
              >
                {editContent}
              </Content>
              <EditTime>
                <span id="edited">Edited</span>
                {note && <Time time={note.updatedAt} />}
              </EditTime>
            </ViewData>
            <span className="note-action-wrap">
              <NoteActions
                note={note}
                show={true}
                pin={true}
                close={handleCloseNote}
                clickLabel={() => setShowLabels(true)}
              />
            </span>
            <OutsideClickHandler onOutsideClick={() => setShowLabels(false)}>
              {showLabels && (
                <>
                  <Overlay onClick={() => setShowLabels(false)} />
                  <Labels small={true} note={note} />
                </>
              )}
            </OutsideClickHandler>
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
  background-color: ${(props) => props.theme.colors.cardBg};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

  @media (max-width: 600px) {
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    top: 0;
    bottom: 0;
    position: fixed;

    .note-action-main {
      order: 1;
    }
  }
`;

const ViewData = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;

  #title[data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #999;
  }

  @media (max-width: 680px) {
    order: 2;
  }
`;

const Title = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text1};
`;
const Content = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  margin-bottom: 20px;
  line-height: 1.5rem;
  letter-spacing: 0.00625em;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text2};
  flex: 1;
`;

const EditTime = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: ${(props) => props.theme.colors.text2};
  gap: 3px;
  font-weight: 400;
`;
