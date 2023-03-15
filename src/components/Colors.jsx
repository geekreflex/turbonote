import React from 'react';
import styled from 'styled-components';

const Colors = () => {
  const hex = {
    value: '#338b33',
    label: 'Green',
    vlaue: '#40146a',
    label: 'Purple',
  };
  return (
    <div>
      <div>
        {hex.map((h) => (
          <Color color={h.value} />
        ))}
      </div>
    </div>
  );
};

export default Colors;

const Color = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
`;
