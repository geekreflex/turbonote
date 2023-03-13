import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  deleteNote,
  pinNote,
  setSelectedNote,
} from '../features/note/noteSlice';
import { shortenSentence } from '../utils/convert';
import ArchiveIcon from './icons/ArchiveIcon';
import BinIcon from './icons/BinIcon';
import PinIcon from './icons/PinIcon';
import StarIcon from './icons/StarIcon';

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const handleDeleteNote = (e) => {
    e.stopPropagation();
    dispatch(deleteNote(note.id));
  };

  const handlePinNote = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('here');
    const payload = {
      ...note,
      pinned: !note.pinned,
    };
    dispatch(pinNote(payload));
  };

  const handleViewNote = () => {
    dispatch(setSelectedNote(note.id));
  };

  return (
    <NoteCard
      as={motion.div}
      initial={{ scale: 0, y: 300 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: -600 }}
      transition={{ duration: 0.2 }}
      whileHover={{
        scale: 1.05,
        boxShadow: `rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px`,
      }}
      whileTap={{ scale: 0.8 }}
      onPointerDownCapture={(e) => e.stopPropagation()}
    >
      {note.pinned && (
        <Star>
          <StarIcon />
        </Star>
      )}
      <div className="card-data" onClick={handleViewNote}>
        <h4>{note.title}</h4>
        <p>{note && shortenSentence(note.content, 110)}</p>
      </div>
      <div className="card-actions">
        <ButtonIconSm onClick={handleDeleteNote}>
          <BinIcon />
        </ButtonIconSm>
        <ButtonIconSm onClick={handlePinNote}>
          <PinIcon />
        </ButtonIconSm>
        <ButtonIconSm>
          <ArchiveIcon />
        </ButtonIconSm>
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

  .card-actions {
    padding: 10px;
    display: flex;
    gap: 10px;
    button {
      visibility: hidden;
      opacity: 0;
    }
  }

  :hover {
    .card-actions {
      button {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;

const ButtonIconSm = styled.button`
  border: none;
  outline: none;
  width: 33px;
  height: 33px;
  font-size: 18px;
  border-radius: 50%;
  background-color: transparent;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #eee;
    color: #222;
  }
`;

const Star = styled.div`
  position: absolute;
  background-color: #444;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  right: -10px;
  top: -10px;
`;

export default Note;
