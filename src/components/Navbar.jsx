import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  toggleAddEditLabel,
  toggleAddNote,
} from '../features/action/actionSlice';
import AddIcon from './icons/AddIcon';
import ArchiveIcon from './icons/ArchiveIcon';
import BinIcon from './icons/BinIcon';
import EditIcon from './icons/EditIcon';
import SearchIcon from './icons/SearchIcon';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleAddNoteModal = () => {
    dispatch(toggleAddNote(true));
  };

  const handleAddEditLabel = () => {
    dispatch(toggleAddEditLabel(true));
  };

  return (
    <NavWrap>
      <NavMain
        as={motion.div}
        initial={{ y: 100, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ButtonIcon
          onClick={handleAddNoteModal}
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <AddIcon />
        </ButtonIcon>
        <ButtonIcon
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <ArchiveIcon />
        </ButtonIcon>
        <ButtonIcon
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <BinIcon />
        </ButtonIcon>
        <ButtonIcon
          onClick={handleAddEditLabel}
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          <EditIcon />
        </ButtonIcon>
        <ButtonIcon
          onClick={handleAddEditLabel}
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          <SearchIcon />
        </ButtonIcon>
      </NavMain>
    </NavWrap>
  );
};

export default Navbar;

const NavWrap = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
  padding: 30px 0;
  left: 0;
  pointer-events: none;
`;
const NavMain = styled.div`
  width: 300px;
  max-width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px, 0 0px 1px 1px #eee;
  pointer-events: auto;
  justify-content: space-between;
  align-items: center;
`;

const ButtonIcon = styled.button`
  background: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  background-color: transparent;
  color: #333;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #333;
    color: #fff;
  }
`;
