import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
import { listenForNotes } from '../features/note/noteSlice';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Container } from '../styles/GlobalStyles';
import ViewNote from '../components/ViewNote';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AddEditLabels from '../components/AddEditLabels';
import { signOutUser } from '../features/auth/authSlice';

const Note = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenForNotes());
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ x: 100 }}
      >
        <Container>
          <Logo>
            <Link to="/">
              <span>🚀🚀🚀</span>
            </Link>
            <button onClick={() => dispatch(signOutUser())}>Logout</button>
          </Logo>
          <NoteList />
          <CreateNote />
          <AddEditLabels />
          <ViewNote />
          <Navbar />
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default Note;

export const NoteWrap = styled.div``;
export const Logo = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin: 20px 0;
  a {
    color: #333;
    text-decoration: none;
    span {
      margin-right: 10px;
    }
  }
`;
