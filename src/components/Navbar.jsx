import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddNote } from '../features/action/actionSlice';

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
        transition={{ duration: 0.5 }}
      >
        <Avatar>
          <img src={user.photoURL} alt={user.displayName} />
        </Avatar>
        <button onClick={handleAddNoteModal}>Add Note</button>
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
  width: 400px;
  background-color: #fff;
  padding: 15px;
  border-radius: 50px;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  pointer-events: auto;
`;
const Avatar = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 50px;
  }
`;
