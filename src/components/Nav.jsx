import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Profile from './Profile';

const Nav = () => {
  return (
    <NavWrap>
      <div className="left">
        <Logo>
          <Link to="/">
            <span>🚀🚀🚀</span>
          </Link>
        </Logo>
      </div>
      <div className="right">
        <Profile />
      </div>
    </NavWrap>
  );
};

export default Nav;

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: center;
  height: 80px;

  .left,
  .right {
  }
`;
export const Logo = styled.div`
  font-size: 30px;
  font-weight: 900;
  a {
    color: #333;
    text-decoration: none;
    span {
      margin-right: 10px;
    }
  }
`;
