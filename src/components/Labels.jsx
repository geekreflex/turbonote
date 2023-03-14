import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { prioritizeIds } from '../utils/sort';

const Labels = ({ selectedLabels, setSelectedLabels, small }) => {
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

  return (
    <AnimatePresence>
      <LabelsWrap
        small={small}
        as={motion.div}
        initial={{ y: 200 }}
        animate={{ y: 0 }}
      >
        {sortedLabels.map((label) => (
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
  background-color: #fff;
  min-height: 20px;
  max-height: 100px;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #eee;
  overflow-y: auto;

  @media (max-width: 680px) {
    max-height: 50vh;
  }

  .selected {
    background-color: #444;
    color: #fff;
    border-color: #444;
  }

  button {
    padding: 5px 10px;
    border: 1px solid #777;
    background: transparent;
    outline: none;
    border-radius: 21px;
    font-weight: 400;
    color: #777;
    font-size: ${(props) => (props.small ? '11px' : '14px')};
    transition: all 300ms;
    cursor: pointer;
    :hover {
      background-color: #444;
      color: #fff;
      border-color: #444;
    }
  }
`;
