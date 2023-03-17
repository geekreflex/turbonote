import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Logo } from '../styles/GlobalStyles';

const Header = () => {
  return (
    <HeaderWrap>
      <Logo>
        <Link to="/">
          <span>🚀🚀🚀</span>
        </Link>
      </Logo>
      <nav>
        <Link to="/auth">
          <Button>Sign In or Join Now</Button>
        </Link>
      </nav>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
`;
