import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { pinNote, setSelectedNote } from '../features/note/noteSlice';
import { ButtonIconSm } from '../styles/GlobalStyles';
import { shortenSentence } from '../utils/convert';
import Pin from './excerpts/Pin';
import ArchiveIcon from './icons/ArchiveIcon';
import BinIcon from './icons/BinIcon';
import PinIcon from './icons/PinIcon';
import PinIcon2 from './icons/PinIcon2';
import RestoreIcon from './icons/RestoreIcon';
import NoteActions from './NoteActions';

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { view } = useSelector((state) => state.action);

  const handlePinNote = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const payload = {
      ...note,
      pinned: !note.pinned,
    };
    dispatch(pinNote(payload));
  };

  const handleViewNote = () => {
    dispatch(setSelectedNote(note.id));
    navigate(`#${view}/${note.id}`);
  };

  return (
    <NoteCard
      as={motion.div}
      initial={{ scale: 0, y: 300 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 300 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.05,
        boxShadow: `rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px`,
      }}
      whileTap={{ scale: 0.8 }}
      onPointerDownCapture={(e) => e.stopPropagation()}
    >
      <Pin note={note} />
      <div className="card-data" onClick={handleViewNote}>
        {note.title && <h4>{note.title}</h4>}
        <p>{note && shortenSentence(note.content, 110)}</p>
      </div>
      <div className="card-actions">
        <NoteActions note={note} />
      </div>
    </NoteCard>
  );
};

const NoteCard = styled.div`
  cursor: default;
  background-color: #fff;
  border-radius: 21px;
  box-shadow: 0 0px 1px 1px #eee;
  position: relative;

  .card-data {
    padding: 30px;
    height: 110px;

    h4 {
      margin-bottom: 10px;
      color: #333;
    }

    p {
      color: #444;
      line-height: 1.3;
    }
  }

  :hover {
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
