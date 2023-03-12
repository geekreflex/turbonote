import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border;
}

body {
  background-color: #ddd;
}
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
