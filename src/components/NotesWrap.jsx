import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const NotesWrap = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <Wrap>{children}</Wrap>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotesWrap;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  list-style: none;
`;
