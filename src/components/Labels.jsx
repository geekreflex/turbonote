import React from 'react';
import styled from 'styled-components';

const Labels = () => {
  const labels = [
    { name: 'All' },
    { name: 'Personal' },
    { name: 'Work' },
    { name: 'School' },
    { name: 'Designs' },
    { name: 'Coding' },
    { name: 'Ideas' },
  ];
  return (
    <LabelsWrap>
      {labels.map((label) => (
        <button key={label.name}>{label.name}</button>
      ))}
    </LabelsWrap>
  );
};

export default Labels;

const LabelsWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

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
