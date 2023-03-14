import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  archiveNote,
  deleteNote,
  pinNote,
  setSelectedNote,
  trashNote,
} from '../features/note/noteSlice';
import { shortenSentence } from '../utils/convert';
import ArchiveIcon from './icons/ArchiveIcon';
import BinIcon from './icons/BinIcon';
import PinIcon from './icons/PinIcon';
import PinIcon2 from './icons/PinIcon2';
import RestoreIcon from './icons/RestoreIcon';

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { view } = useSelector((state) => state.action);

  const handleTrashNote = (e) => {
    e.stopPropagation();
    const payload = {
      ...note,
      trashed: true,
    };
    dispatch(trashNote(payload));
  };

  const handlePinNote = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const payload = {
      ...note,
      pinned: !note.pinned,
    };
    dispatch(pinNote(payload));
  };

  const handleArchiveNote = (e) => {
    const payload = {
      ...note,
      archived: !note.archived,
    };
    dispatch(archiveNote(payload));
  };

  const handleViewNote = () => {
    dispatch(setSelectedNote(note.id));
    navigate(`#note/${note.id}`);
  };

  const handleRestoreNote = () => {
    const payload = {
      ...note,
      trashed: false,
    };
    dispatch(trashNote(payload));
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(note.id));
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
      {view !== 'trash' && (
        <Pin onClick={handlePinNote} className="pin">
          {note.pinned ? <PinIcon2 /> : <PinIcon />}
        </Pin>
      )}
      <div className="card-data" onClick={handleViewNote}>
        <h4>{note.title}</h4>
        <p>{note && shortenSentence(note.content, 110)}</p>
      </div>
      <div className="card-actions">
        {view !== 'trash' && (
          <>
            <ButtonIconSm onClick={handleTrashNote}>
              <BinIcon />
            </ButtonIconSm>
            <ButtonIconSm onClick={handleArchiveNote}>
              <ArchiveIcon />
            </ButtonIconSm>
          </>
        )}
        {view === 'trash' && (
          <>
            <ButtonIconSm onClick={handleRestoreNote}>
              <RestoreIcon />
            </ButtonIconSm>
            <ButtonIconSm onClick={handleDeleteNote}>
              <BinIcon />
            </ButtonIconSm>
          </>
        )}
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

  .pin {
    visibility: hidden;
    opacity: 0;
  }

  :hover {
    .pin {
      visibility: visible;
      opacity: 1;
    }
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

const Pin = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  border-radius: 50%;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    :hover {
      background-color: #eee;
      color: #222;
    }
  }
`;

export default Note;
