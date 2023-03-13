import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteNote, setSelectedNote } from '../features/note/noteSlice';
import { shortenSentence } from '../utils/convert';

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const handleDeleteNote = (e) => {
    e.stopPropagation();
    dispatch(deleteNote(note.id));
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
      transition={{ duration: 0.5 }}
    >
      <div className="card-data" onClick={handleViewNote}>
        <h4>{note.title}</h4>
        <p>{note && shortenSentence(note.content, 110)}</p>
      </div>
      <div className="card-actions">
        <button className="card-actions__del " onClick={handleDeleteNote}>
          del
        </button>
      </div>
    </NoteCard>
  );
};

const NoteCard = styled.div`
  cursor: default;
  background-color: #fff;
  border-radius: 21px;

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
    .card-actions__del {
      visibility: hidden;
      opacity: 0;
    }
  }

  :hover {
    .card-actions {
      .card-actions__del {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;

export default Note;
