import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setSelectedNote, updateNote } from '../features/note/noteSlice';
import { shortenSentence } from '../utils/convert';
import Pin from './excerpts/Pin';
import Labels from './Labels';
import NoteActions from './NoteActions';
import OutsideClickHandler from 'react-outside-click-handler';

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hash = location.hash;
  const navigate = useNavigate();
  const { view } = useSelector((state) => state.action);
  const [showLabels, setShowLabels] = useState(false);

  const handleViewNote = () => {
    dispatch(setSelectedNote(note.id));
    navigate(`#${view}/${note.id}`);
    localStorage.setItem('hash', hash);
  };

  const handleShwoNoteLabel = () => {
    setShowLabels(true);
  };

  return (
    <NoteCard
      as={motion.div}
      initial={{ scale: 0, y: 300 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 300 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
      onPointerDownCapture={(e) => e.stopPropagation()}
    >
      <Pin note={note} />
      <div className="card-data" onClick={handleViewNote}>
        {note.title && <h4>{note.title}</h4>}
        <p>{note && shortenSentence(note.content, 110)}</p>
      </div>
      <div className="card-actions">
        <NoteActions note={note} clickLabel={handleShwoNoteLabel} />
      </div>
      <OutsideClickHandler onOutsideClick={() => setShowLabels(false)}>
        {showLabels && <Labels small={true} note={note} />}
      </OutsideClickHandler>
    </NoteCard>
  );
};

const NoteCard = styled.div`
  cursor: default;
  background-color: ${(props) => props.theme.colors.cardBg};
  border-radius: 21px;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.colors.shadow1};

  .card-data {
    padding: 30px;
    height: 110px;

    h4 {
      margin-bottom: 10px;
      color: ${(props) => props.theme.colors.text1};
    }

    p {
      color: ${(props) => props.theme.colors.text2};
      line-height: 1.3;
    }
  }

  :hover {
    box-shadow: ${(props) => props.theme.colors.shadow2};
    .pin {
      visibility: visible;
      opacity: 1;
    }
    .card-actions {
      * {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;

export default Note;
