import React from 'react';
import styled from 'styled-components';
import ViewWrap from './ViewWrap';

const NotesWrap = ({ children }) => {
  return (
    <ViewWrap>
      <Wrap>{children}</Wrap>
    </ViewWrap>
  );
};

export default NotesWrap;

const Wrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  list-style: none;
  margin-bottom: 100px;
`;
