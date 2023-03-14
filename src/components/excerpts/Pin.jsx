import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { pinNote } from '../../features/note/noteSlice';
import { PinIcon, PinIcon2 } from '../icons';

const Pin = ({ note, show }) => {
  const dispatch = useDispatch();

  const { view } = useSelector((state) => state.action);
  const handlePinNote = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const payload = {
      ...note,
      pinned: !note.pinned,
    };
    dispatch(pinNote(payload));
  };
  return (
    view !== 'trash' && (
      <PinWrap show={show} onClick={handlePinNote} className="pin">
        {note.pinned ? <PinIcon2 /> : <PinIcon />}
      </PinWrap>
    )
  );
};

export default Pin;

const PinWrap = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  visibility: visible;
  opacity: 1;
  align-items: center;
  color: #444;
  border-radius: 50%;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? '1' : '0')};

  :hover {
    background-color: #eee;
    color: #222;
  }
`;
