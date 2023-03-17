import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Logo } from '../styles/GlobalStyles';

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <HeaderWrap>
      <Logo>
        <Link to="/">
          <span>🚀🚀🚀</span>
        </Link>
      </Logo>
      <nav>
        {!isLoggedIn && (
          <Link to="/auth">
            <Button>Sign In or Join Now</Button>
          </Link>
        )}
      </nav>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
`;
