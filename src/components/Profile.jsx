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
import RocketImg from '../assets/rocket.png';

const TEST_USER = 'ZOx9xbEeNmOGrYhYzJeC6FTCfcJ2';

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
          <p>{user.uid === TEST_USER ? 'Turbo Test' : user.displayName}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <ul>
        <li onClick={themeClick}>
          <span className="li-icon">
            {mode === 'light' ? <MoonIcon /> : <SunIcon />}
          </span>
          <span>{`Enable ${mode === 'light' ? ' dark' : 'light'} theme`}</span>
        </li>
        <li>
          <span className="li-icon">
            <SettingsIcon />
          </span>
          <span>Settings</span>
        </li>
        <li onClick={() => dispatch(signOutUser())}>
          <span className="li-icon">
            <LogoutIcon />
          </span>
          <span>Sign out</span>
        </li>
      </ul>
    </DropdownWrap>
  );
};

const Img = ({ size }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Avatar size={size}>
      <img
        src={user.uid === TEST_USER ? RocketImg : user.photoURL}
        alt={user.displayName}
      />
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
  padding: 6px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.colors.highlight3};
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
  width: 300px;
  /* max-width: 100%; */
  right: 0;
  margin-top: 30px;
  padding: 20px 0;
  border-radius: 21px;
  color: ${(props) => props.theme.colors.text3};

  @media (max-width: 600px) {
    position: fixed;
    /* min-width: 100%; */
    /* max-width: 100%; */
  }

  .user-info {
    display: flex;
    margin-bottom: 20px;
    padding: 0 10px;
    align-items: center;
    gap: 10px;

    .user-data {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p:first-child {
      font-weight: 600;
    }

    p:last-child {
      font-size: 13px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
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
      span:last-child {
        flex: 1;
      }
      span:first-child {
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
