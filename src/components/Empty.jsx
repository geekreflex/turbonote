import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import {
  BinIcon,
  PaperIcon,
  ArchiveIcon,
  SearchIcon,
  CloseIcon,
} from './icons';

const Empty = ({ type }) => {
  const data = {
    note: {
      text: "You don't have any notes yet.",
      icon: <PaperIcon />,
    },
    search: {
      text: 'Blast off with search.',
      icon: <SearchIcon />,
    },
    empty: {
      text: 'No matching results.',
      icon: <CloseIcon />,
    },
    archive: {
      text: "You haven't archived any notes yet.",
      icon: <ArchiveIcon />,
    },
    trash: {
      text: 'Trash is empty',
      icon: <BinIcon />,
    },
  };

  return (
    <AnimatePresence>
      <EmptyWrap
        as={motion.div}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <span>{data[type].icon}</span>
        <p>{data[type].text}</p>
      </EmptyWrap>
    </AnimatePresence>
  );
};

export default Empty;

const EmptyWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text4};

  span {
    font-size: 90px;
    margin-top: 10vh;
  }

  p {
    font-size: 30px;
    text-align: center;
  }

  @media (max-width: 768px) {
    span {
      font-size: 55px;
    }
    p {
      font-size: 20px;
    }
  }
`;
