import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  archiveNote,
  deleteNote,
  removeSelectedNote,
  trashNote,
} from '../features/note/noteSlice';
import { ButtonIconSm, CloseBtn } from '../styles/GlobalStyles';
import { BinIcon, LabelIcon, PaletteIcon, RestoreIcon } from './icons';
import ArchiveIcon from './icons/ArchiveIcon';

const NoteActions = ({ note, show, clickLabel, close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { view } = useSelector((state) => state.action);

  const handleTrashNote = (e) => {
    e.stopPropagation();
    const payload = {
      ...note,
      trashed: true,
    };
    dispatch(trashNote(payload));
    handleCloseNote();
  };

  const handleRestoreNote = () => {
    const payload = {
      ...note,
      trashed: false,
    };
    dispatch(trashNote(payload));
    handleCloseNote();
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(note.id));
    handleCloseNote();
  };

  const handleArchiveNote = (e) => {
    const payload = {
      ...note,
      archived: !note.archived,
    };
    dispatch(archiveNote(payload));
    handleCloseNote();
  };

  // const handleCloseNote = () => {
  //   dispatch(removeSelectedNote());
  //   navigate(`/note#${view}`);
  // };

  return (
    <NoteActionWrap show={show}>
      <div className="left">
        {view !== 'trash' && (
          <>
            <ButtonIconSm onClick={handleTrashNote}>
              <BinIcon />
            </ButtonIconSm>
            <ButtonIconSm onClick={handleArchiveNote}>
              <ArchiveIcon />
            </ButtonIconSm>
            <ButtonIconSm onClick={clickLabel}>
              <LabelIcon />
            </ButtonIconSm>
            <ButtonIconSm onClick={clickLabel}>
              <PaletteIcon />
            </ButtonIconSm>
          </>
        )}
        {view === 'trash' && (
          <>
            <ButtonIconSm onClick={handleRestoreNote}>
              <RestoreIcon />
            </ButtonIconSm>
            <ButtonIconSm onClick={handleDeleteNote}>
              <BinIcon />
            </ButtonIconSm>
          </>
        )}
      </div>
      <div className="right">
        {show && <CloseBtn onClick={close}>Close</CloseBtn>}
      </div>
    </NoteActionWrap>
  );
};

export default NoteActions;

const NoteActionWrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;

  * {
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.show ? '1' : '0')};
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    * {
      visibility: visible;
      opacity: 1;
    }
  }
`;
