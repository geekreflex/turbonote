import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { clearErrorMessage } from '../features/action/actionSlice';

const Toast = ({ message, duration, type, position }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const { errMessage } = useSelector((state) => state.action);
  const toastDuration = duration || 3000;
  useEffect(() => {
    if (errMessage) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        dispatch(clearErrorMessage());
      }, toastDuration);
    }
  }, [errMessage, toastDuration]);
  return (
    showToast && (
      <AnimatePresence>
        <ToastContainer
          as={motion.div}
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 0 }}
        >
          <span>{message || errMessage || 'Note updated'}</span>
        </ToastContainer>
      </AnimatePresence>
    )
  );
};

export default Toast;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: ${(props) => props.theme.colors.cardBg};
  padding: 25px 30px;
  border-radius: 21px;
  min-width: 200px;
  box-shadow: ${(props) => props.theme.colors.shadow2};
  color: ${(props) => props.theme.colors.text2};
`;
