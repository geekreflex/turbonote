import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { prioritizeIds } from '../utils/sort';
import { updateNoteLabel } from '../features/note/noteSlice';
import { AddIcon } from './icons';
import { toggleAddEditLabel } from '../features/action/actionSlice';

const Labels = ({ small, note, setl = null }) => {
  const dispatch = useDispatch();
  const [selectedLabels, setSelectedLabels] = useState(note ? note.labels : []);

  const { labels } = useSelector((state) => state.label);
  const sortedLabels = prioritizeIds(selectedLabels, labels);

  const handleLabelClick = (label) => {
    setSelectedLabels(...selectedLabels, label);
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((item) => item !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handleAddEditLabel = () => {
    dispatch(toggleAddEditLabel(true));
  };

  useEffect(() => {
    if (!note) {
      setl(selectedLabels);
      return;
    }
    if (
      note &&
      note.labels.length === selectedLabels.length &&
      note.labels.every((item) => selectedLabels.includes(item))
    ) {
      return;
    }
    dispatch(updateNoteLabel({ ...note, labels: selectedLabels }));
  }, [selectedLabels]);

  return (
    <AnimatePresence>
      <LabelsWrap
        small={small}
        as={motion.div}
        initial={{ y: 200 }}
        animate={{ y: 0 }}
      >
        {labels?.map((label) => (
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            key={label.id}
            onClick={() => handleLabelClick(label.id)}
            className={selectedLabels.includes(label.id) ? 'selected' : ''}
          >
            {label.name}
          </motion.button>
        ))}
        <motion.button
          onClick={handleAddEditLabel}
          data-tooltip-id="nact"
          data-tooltip-content="Add label"
          className="add-label"
        >
          <AddIcon />
        </motion.button>
      </LabelsWrap>
    </AnimatePresence>
  );
};

export default Labels;

const LabelsWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.bgColor};
  min-height: 20px;
  max-height: 100px;
  align-items: center;
  padding: 20px;
  border-top: 1px solid ${(props) => props.theme.colors.border1};
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: 50vh;
  }

  .selected {
    background-color: ${(props) => props.theme.colors.text2};
    color: ${(props) => props.theme.colors.cardBg};
    border-color: ${(props) => props.theme.colors.text2};
  }

  button {
    padding: 5px 10px;
    border: 1px solid ${(props) => props.theme.colors.border1};
    background: transparent;
    outline: none;
    border-radius: 21px;
    font-weight: 600;
    color: #777;
    font-size: ${(props) => (props.small ? '12px' : '14px')};
    transition: all 300ms;
    cursor: pointer;
    :hover {
      border-color: ${(props) => props.theme.colors.text2};
    }
  }

  .add-label {
    display: flex;
  }
`;
