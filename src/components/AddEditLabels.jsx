import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toggleAddEditLabel } from '../features/action/actionSlice';
import {
  createLabel,
  deleteLabel,
  updateLabel,
} from '../features/label/labelSlice';
import { ButtonIconSm, Overlay } from '../styles/GlobalStyles';
import { BinIcon, CheckIcon, PlaneIcon } from './icons';

const AddEditLabels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { labels } = useSelector((state) => state.label);
  const { addLabelModal, view } = useSelector((state) => state.action);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [delLabelId, setDelLabelId] = useState('');
  const [editLabelId, setEditLabelId] = useState('');
  const [editedText, setEditedText] = useState('');
  const [name, setName] = useState('');
  const inputRef = useRef();
  const addInputRef = useRef();

  const handleCreateLabel = (e) => {
    e.preventDefault();
    dispatch(createLabel({ name }));
    setName('');
  };

  const handleItemClick = (index, text, id) => {
    setEditingIndex(index);
    setEditedText(text);
    setEditLabelId(id);
  };

  const handleInputBlur = (label) => {
    setEditingIndex(-1);
    if (label.name !== editedText) {
      handleUpdateLabel(label);
    }
  };

  const closeModal = () => {
    dispatch(toggleAddEditLabel(false));
    navigate(`/note#${view}`);
    setEditingIndex('');
    setEditedText('');
    setEditLabelId('');
    setDelLabelId('');
    setName('');
  };

  const onDeleteClick = (id) => {
    setDelLabelId(id);
  };

  const handleDeleteLabel = (id) => {
    dispatch(deleteLabel(id));
  };

  const handleUpdateLabel = (label) => {
    if (editedText === '') {
      return;
    }
    console.log({ ...label, name: editedText });
    dispatch(updateLabel({ ...label, name: editedText }));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setDelLabelId('');
    } else {
      // setEditLabelId('');
    }
  }, [editingIndex]);

  useEffect(() => {
    if (addInputRef.current) {
      addInputRef.current.focus();
    }
  }, []);

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
                    ref={addInputRef}
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
                      {delLabelId && delLabelId === label.id ? (
                        <ButtonIconSm
                          onClick={() => handleDeleteLabel(label.id)}
                        >
                          <CheckIcon />
                        </ButtonIconSm>
                      ) : (
                        <ButtonIconSm onClick={() => onDeleteClick(label.id)}>
                          <BinIcon />
                        </ButtonIconSm>
                      )}
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          onBlur={() => handleInputBlur(label)}
                          ref={inputRef}
                        />
                      ) : (
                        <span
                          onClick={() =>
                            handleItemClick(index, label.name, label.id)
                          }
                        >
                          {label.name}
                        </span>
                      )}
                      {editLabelId && editLabelId === label.id ? (
                        <ButtonIconSm onClick={() => handleUpdateLabel(label)}>
                          <CheckIcon />
                        </ButtonIconSm>
                      ) : (
                        <ButtonIconSm>
                          <PlaneIcon />
                        </ButtonIconSm>
                      )}
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
  background-color: ${(props) => props.theme.colors.cardBg};
  width: 300px;
  border-radius: 21px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.colors.shadow2};
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
      color: ${(props) => props.theme.colors.text3};
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
      border-bottom: 1px solid ${(props) => props.theme.colors.border1};
      background-color: transparent;
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
    border-bottom: 1px solid ${(props) => props.theme.colors.border1};
    font-size: 14px;
    background-color: transparent;
    color: ${(props) => props.theme.colors.text3};
  }
`;
