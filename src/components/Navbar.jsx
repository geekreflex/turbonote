import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  setView,
  toggleAddEditLabel,
  toggleAddNote,
} from '../features/action/actionSlice';
import AddIcon from './icons/AddIcon';
import ArchiveIcon from './icons/ArchiveIcon';
import BinIcon from './icons/BinIcon';
import EditIcon from './icons/EditIcon';
import SearchIcon from './icons/SearchIcon';
import PlaneIcon from './icons/PlaneIcon';
import LabelIcon from './icons/LabelIcon';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { view } = useSelector((state) => state.action);

  const handleAddNoteModal = () => {
    dispatch(toggleAddNote(true));
  };

  const handleAddEditLabel = () => {
    dispatch(toggleAddEditLabel(true));
  };

  const handleViewClick = (view) => {
    dispatch(setView(view));
    navigate(`#${view}`);
  };

  return (
    <AnimatePresence>
      <NavWrap>
        <NavMain
          as={motion.div}
          initial={{ y: 100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ButtonIcon
            aria-label="Add Note"
            onClick={
              view === 'note'
                ? handleAddNoteModal
                : () => handleViewClick('note')
            }
            as={motion.button}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            {view === 'note' ? <AddIcon /> : <EditIcon />}
          </ButtonIcon>

          <ButtonIcon
            aria-label="Archived Notes "
            onClick={() => handleViewClick('archive')}
            as={motion.button}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <ArchiveIcon />
          </ButtonIcon>
          <ButtonIcon
            aria-label="Trashed Notes"
            onClick={() => handleViewClick('trash')}
            as={motion.button}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <BinIcon />
          </ButtonIcon>
          <ButtonIcon
            aria-label="Add/Edit Labels"
            onClick={handleAddEditLabel}
            as={motion.button}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            <LabelIcon />
          </ButtonIcon>
          <ButtonIcon
            aria-label="Search"
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
    </AnimatePresence>
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
