import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border;
}

body {
  background-color: ${(props) => props.theme.colors.bgColor};
}
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ButtonIconSm = styled.button`
  border: none;
  outline: none;
  width: 33px;
  height: 33px;
  font-size: 18px;
  border-radius: 50%;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text2};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.colors.highlight};
    color: ${(props) => props.theme.colors.text1};
  }
`;

export const CloseBtn = styled.button`
  padding: 10px 25px;
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text1};
  transition: all 300ms;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.colors.highlight};
  }
`;
