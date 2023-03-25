import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border;
}

a {
  text-decoration: none;
}

body {
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.text2}
}

/* Change the scrollbar style for webkit-based browsers */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) =>
      props.theme.colors
        .scrollbarTrackBg}; /* Use a light grey color for the scrollbar track #f5f5f5 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.colors
        .scrollbarThumbBg}; /* Use a slightly darker grey color for the scrollbar thumb #ccc */
    border-radius: 5px;
    border: 3px solid ${(props) =>
      props.theme.colors.scrollbarTrackBg}; /* #f5f5f5 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) =>
      props.theme.colors
        .scrollbarThumbBgHover}; /* Use a darker grey color for the scrollbar thumb when hovering over it #999 */
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
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

export const Button = styled.button`
  padding: 13px 20px;
  background-color: ${(props) => props.theme.colors.btnBg1};
  color: ${(props) => props.theme.colors.btnText1};
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 100ms;
  :hover {
    /* box-shadow: ${(props) => props.theme.colors.shadow2}; */
    background-color: ${(props) => props.theme.colors.text1};
  }

  .icon {
    display: flex;
    font-size: 20px;
  }

  @media (max-wdith: 600px) {
    font-size: 12px;
  }
`;

export const Logo = styled.div`
  font-size: 30px;
  font-weight: 900;
  a {
    color: #999;
    text-decoration: none;
    span {
      margin-right: 10px;
    }
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
