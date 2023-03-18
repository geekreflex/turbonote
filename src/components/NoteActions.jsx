import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { archiveNote, deleteNote, trashNote } from '../features/note/noteSlice';
import { ButtonIconSm, CloseBtn } from '../styles/GlobalStyles';
import Pin from './excerpts/Pin';
import { BinIcon, LabelIcon, PaletteIcon, RestoreIcon } from './icons';
import ArchiveIcon from './icons/ArchiveIcon';

const NoteActions = ({
  note,
  show,
  clickLabel,
  close,
  pin = false,
  isEditing = false,
}) => {
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
    close();
  };

  return (
    <NoteActionWrap show={show}>
      <div className="left">
        {view !== 'trash' && (
          <>
            <ButtonIconSm
              onClick={handleTrashNote}
              data-tooltip-id="nact"
              data-tooltip-content="Delete note"
            >
              <BinIcon />
            </ButtonIconSm>
            <ButtonIconSm
              onClick={handleArchiveNote}
              data-tooltip-id="nact"
              data-tooltip-content="Archive note"
            >
              <ArchiveIcon />
            </ButtonIconSm>
            <ButtonIconSm
              onClick={clickLabel}
              data-tooltip-id="nact"
              data-tooltip-content="Edit label"
            >
              <LabelIcon />
            </ButtonIconSm>
            {pin && <Pin note={note} show={true} pos={'static'} />}
            {false && (
              <ButtonIconSm onClick={clickLabel}>
                <PaletteIcon />
              </ButtonIconSm>
            )}
          </>
        )}
        {view === 'trash' && (
          <>
            <ButtonIconSm
              onClick={handleRestoreNote}
              data-tooltip-id="nact"
              data-tooltip-content="Restore note"
            >
              <RestoreIcon />
            </ButtonIconSm>
            <ButtonIconSm
              onClick={handleDeleteNote}
              data-tooltip-id="nact"
              data-tooltip-content="Delete forever"
            >
              <BinIcon />
            </ButtonIconSm>
          </>
        )}
      </div>
      <div className="right">
        {show && (
          <CloseBtn onClick={close}>{isEditing ? 'Update' : 'Close'}</CloseBtn>
        )}
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
