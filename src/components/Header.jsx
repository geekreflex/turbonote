import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, Logo } from '../styles/GlobalStyles';
import Profile from './Profile';

const Header = ({ name }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderWrap isFixed={isHeaderFixed}>
      <Container>
        <HeaderMain>
          <Logo>
            <Link to="/">
              <span>🚀🚀🚀</span>
            </Link>
          </Logo>
          <nav>
            {name == 'home' && !isLoggedIn && (
              <Link to="/auth">
                <Button>Sign In or Join Now</Button>
              </Link>
            )}

            {name === 'note' && <Profile />}
          </nav>
        </HeaderMain>
      </Container>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  position: ${(props) => (props.isFixed ? 'sticky' : 'absolute')};
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.bgColor};
  z-index: 99;
  box-shadow: ${(props) => (props.isFixed ? props.theme.colors.shadow2 : '')};
  transition: top 0.3s ease-in-out;
`;

const HeaderMain = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
`;
