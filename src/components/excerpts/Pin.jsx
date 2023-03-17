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
      <PinWrap
        show={show}
        onClick={handlePinNote}
        className="pin"
        data-tooltip-id="pin"
        data-tooltip-content={
          note.archived
            ? 'Pin archived note'
            : note.pinned
            ? 'Unpin note'
            : 'Pin note'
        }
      >
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
  color: ${(props) => props.theme.colors.text2};
  border-radius: 50%;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? '1' : '0')};

  :hover {
    background-color: ${(props) => props.theme.colors.highlight};
    color: ${(props) => props.theme.colors.text1};
  }

  @media (max-width: 768px) {
    visibility: visible;
    opacity: 1;
  }
`;
