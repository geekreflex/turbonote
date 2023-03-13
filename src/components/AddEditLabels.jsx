import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddEditLabel } from '../features/action/actionSlice';
import { createLabel } from '../features/label/labelSlice';
import { Overlay } from '../styles/GlobalStyles';

const AddEditLabels = () => {
  const dispatch = useDispatch();
  const { labels } = useSelector((state) => state.label);
  const { addLabelModal } = useSelector((state) => state.action);
  const [name, setName] = useState('');

  const handleCreateLabel = (e) => {
    e.preventDefault();
    dispatch(createLabel({ name }));
  };

  const closeModal = () => {
    dispatch(toggleAddEditLabel(false));
  };
  return (
    <AnimatePresence>
      {addLabelModal && (
        <AddEditLabelsWrap>
          <Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={closeModal}
          />
          <Main
            as={motion.div}
            initial={{ scale: 0, y: 300 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 300 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <form onSubmit={handleCreateLabel}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Create new label"
                />
                <button>create</button>
              </form>
            </div>
          </Main>
        </AddEditLabelsWrap>
      )}
    </AnimatePresence>
  );
};

export default AddEditLabels;

const AddEditLabelsWrap = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Main = styled.div`
  position: relative;
  background-color: #fff;
  width: 300px;
  border-radius: 21px;
`;
