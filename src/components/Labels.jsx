import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Labels = () => {
  const { labels } = useSelector((state) => state.label);
  return (
    <LabelsWrap>
      <button>All</button>
      {labels.map((label) => (
        <button key={label.id}>{label.name}</button>
      ))}
    </LabelsWrap>
  );
};

export default Labels;

const LabelsWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  button {
    padding: 5px 10px;
    border: 1px solid #999;
    background: transparent;
    outline: none;
    border-radius: 21px;
    font-weight: 400;
    color: #999;
    font-size: 14px;
    cursor: pointer;
    :hover {
      background-color: #444;
      color: #fff;
      border-color: #444;
    }
  }
`;
