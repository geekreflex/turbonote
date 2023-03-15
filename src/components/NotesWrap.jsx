import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const NotesWrap = ({ children }) => {
  return (
    <AnimatePresence>
      <Wrap
        as={motion.div}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ y: 100, opacity: 0 }}
      >
        {children}
      </Wrap>
    </AnimatePresence>
  );
};

export default NotesWrap;

const Wrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  list-style: none;
  margin-bottom: 100px;
`;
