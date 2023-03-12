import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Note = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <NoteCard
      as={motion.div}
      initial={{ opacity: 0, y: 100, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      key={note.id}
    >
      <div className="card-data">
        <h4>{note.title}</h4>
        <p>{note.content}</p>
      </div>
      <div className="card-actions">
        <button className="card-actions__del">del</button>
      </div>
    </NoteCard>
  );
};

const NoteCard = styled.div`
  cursor: default;
  background-color: #fff;
  border-radius: 8px;

  .card-data {
    padding: 10px;
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
