import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleAddEditLabel } from '../features/action/actionSlice';
import { createLabel } from '../features/label/labelSlice';
import { ButtonIconSm, Overlay } from '../styles/GlobalStyles';
import { BinIcon, PaperIcon, PlaneIcon } from './icons';

const AddEditLabels = () => {
  const dispatch = useDispatch();
  const { labels } = useSelector((state) => state.label);
  const { addLabelModal } = useSelector((state) => state.action);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedText, setEditedText] = useState('');
  const [name, setName] = useState('');
  const inputRef = useRef();

  const handleCreateLabel = (e) => {
    e.preventDefault();
    dispatch(createLabel({ name }));
  };

  const handleItemClick = (index, text) => {
    setEditingIndex(index);
    setEditedText(text);
  };

  const handleInputBlur = () => {
    setEditingIndex(-1);
    setEditedText('');
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const closeModal = () => {
    dispatch(toggleAddEditLabel(false));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

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
            <Inner>
              <form onSubmit={handleCreateLabel}>
                <NewLabel>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Create new label"
                  />
                  <ButtonIconSm>
                    <PlaneIcon />
                  </ButtonIconSm>
                </NewLabel>
              </form>
              <LabelList>
                <ul>
                  {labels.map((label, index) => (
                    <li key={label.id}>
                      <ButtonIconSm>
                        <BinIcon />
                      </ButtonIconSm>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          ref={inputRef}
                        />
                      ) : (
                        <span
                          onClick={() => handleItemClick(index, label.name)}
                        >
                          {label.name}
                        </span>
                      )}
                      <ButtonIconSm>
                        <PlaneIcon />
                      </ButtonIconSm>
                    </li>
                  ))}
                </ul>
              </LabelList>
            </Inner>
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
  overflow: hidden;
`;

const Inner = styled.div`
  overflow-y: auto;
  height: 100%;
  max-height: 80vh;
`;

const LabelList = styled.div`
  padding-bottom: 20px;
  ul {
    list-style: none;
    li {
      font-size: 16px;
      display: flex;
      color: #555;
      cursor: text;
      justify-content: space-between;
      align-items: center;
      padding: 0px 20px;
      gap: 10px;
    }
    input,
    span {
      font-size: 14px;
      text-align: left;
      width: 65%;
      font-weight: 400;
      color: inherit;
    }
    input {
      border: none;
      outline: none;
      border-bottom: 1px solid #999;
    }
  }
`;

const NewLabel = styled.div`
  display: flex;
  padding: 30px 20px;
  flex: 1;

  input {
    flex: 1;
    border: none;
    outline: none;
    border-bottom: 1px solid #999;
    font-size: 14px;
  }
`;
