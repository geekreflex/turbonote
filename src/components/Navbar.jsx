import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddNote } from '../features/action/actionSlice';
import AddIcon from './icons/AddIcon';
import ArchiveIcon from './icons/ArchiveIcon';
import BinIcon from './icons/BinIcon';
import LabelIcon from './icons/LabelIcon';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddNoteModal = () => {
    dispatch(toggleAddNote(true));
  };
  return (
    <NavWrap>
      <NavMain
        as={motion.div}
        initial={{ y: 100, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Avatar
          as={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <img src={user.photoURL} alt={user.displayName} />
        </Avatar>
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
          onClick={handleAddNoteModal}
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <ArchiveIcon />
        </ButtonIcon>
        <ButtonIcon
          onClick={handleAddNoteModal}
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <BinIcon />
        </ButtonIcon>
        <ButtonIcon
          as={motion.button}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          <LabelIcon />
        </ButtonIcon>
      </NavMain>
    </NavWrap>
  );
};

export default Navbar;

const NavWrap = styled.div`
  position: fixed;
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  pointer-events: auto;
  justify-content: space-between;
`;
const Avatar = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 50px;
  }
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
