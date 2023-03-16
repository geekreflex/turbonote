import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LogoutIcon from './icons/LogoutIcon';
import SettingsIcon from './icons/SettingsIcon';
import OutsideClickHandler from 'react-outside-click-handler';
import { signOutUser } from '../features/auth/authSlice';
import { MoonIcon, SunIcon } from './icons';
import { toggleThemeMode } from '../features/action/actionSlice';

const Profile = () => {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  return (
    <ProfileWrap>
      <OutsideClickHandler onOutsideClick={close}>
        <span onClick={() => setShow(true)}>
          <Img size={40} />
        </span>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Dropdown close={close} />
            </motion.div>
          )}
        </AnimatePresence>
      </OutsideClickHandler>
    </ProfileWrap>
  );
};

export default Profile;

const Dropdown = ({ close }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.action);

  const themeClick = () => {
    dispatch(toggleThemeMode());
    close();
  };

  return (
    <DropdownWrap>
      <div className="user-info">
        <span>
          <Img size={60} />
        </span>
        <div className="user-data">
          <p>{user.displayName}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <ul>
        <li onClick={themeClick}>
          <span>{`Enable ${mode === 'light' ? ' dark' : 'light'} theme`}</span>
          <span className="li-icon">
            {mode === 'light' ? <MoonIcon /> : <SunIcon />}
          </span>
        </li>
        <li>
          <span>Settings</span>
          <span className="li-icon">
            <SettingsIcon />
          </span>
        </li>
        <li onClick={() => dispatch(signOutUser())}>
          <span>Sign out</span>
          <span className="li-icon">
            <LogoutIcon />
          </span>
        </li>
      </ul>
    </DropdownWrap>
  );
};

const Img = ({ size }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Avatar size={size}>
      <img src={user.photoURL} alt={user.displayName} />
    </Avatar>
  );
};

const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  display: flex;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.colors.highlight};
  }
  img {
    width: ${(props) => (props.size ? `${props.size}px` : '40px')};
    height: ${(props) => (props.size ? `${props.size}px` : '40px')};
    border-radius: 50%;
    object-fit: cover;
  }
`;

const DropdownWrap = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.cardBg};
  box-shadow: ${(props) => props.theme.colors.shadow2};
  min-width: 300px;
  max-width: 320px;
  right: 0;
  margin-top: 30px;
  padding: 20px 0;
  border-radius: 21px;
  color: ${(props) => props.theme.colors.text3};

  .user-info {
    display: flex;
    margin-bottom: 20px;
    padding: 10px 20px;
    align-items: center;
    gap: 10px;

    p:first-child {
      font-weight: 600;
    }

    p:last-child {
      font-size: 13px;
      font-weight: 600;
    }
  }

  ul {
    list-style: none;
    li {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      justify-content: space-between;
      span:first-child {
        flex: 1;
      }
      span:last-child {
        display: flex;
        font-size: 22px;
        width: 30px;
      }
      :hover {
        background-color: ${(props) => props.theme.colors.highlight};
        cursor: pointer;
      }
    }
  }
`;
