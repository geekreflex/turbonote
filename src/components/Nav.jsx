import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RefreshIcon } from './icons';
import Profile from './Profile';

const Nav = () => {
  const { loading } = useSelector((state) => state.action);

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
        <span className={`refresh-icon ${loading && 'rotate-infinite'}`}>
          <RefreshIcon />
        </span>
        <Profile />
      </div>
    </NavWrap>
  );
};

export default Nav;

const NavWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: center;
  height: 80px;
  z-index: 9;

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .refresh-icon {
    font-size: 30px;
    margin-right: 20px;
    display: flex;
    color: #444;
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
