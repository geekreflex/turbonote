import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LogoutIcon from './icons/LogoutIcon';
import SettingsIcon from './icons/SettingsIcon';
import OutsideClickHandler from 'react-outside-click-handler';
import { signOutUser } from '../features/auth/authSlice';

const Profile = () => {
  const [show, setShow] = useState(false);

  return (
    <ProfileWrap>
      <OutsideClickHandler onOutsideClick={() => setShow(false)}>
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
              <Dropdown />
            </motion.div>
          )}
        </AnimatePresence>
      </OutsideClickHandler>
    </ProfileWrap>
  );
};

export default Profile;

const Dropdown = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
    background-color: #eee;
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
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px, 0 0px 1px 1px #eee;
  min-width: 300px;
  max-width: 320px;
  right: 0;
  top: 80px;
  padding: 20px 0;
  border-radius: 21px;
  color: #555;

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
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
      span:first-child {
        display: flex;
        font-size: 22px;
      }
      :hover {
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
`;
