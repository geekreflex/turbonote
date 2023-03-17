import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
import { listenForNotes } from '../features/note/noteSlice';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Container } from '../styles/GlobalStyles';
import ViewNote from '../components/ViewNote';
import { AnimatePresence, motion } from 'framer-motion';
import AddEditLabels from '../components/AddEditLabels';
import Nav from '../components/Nav';
import ArchivedList from '../components/ArchivedList';
import TrashedList from '../components/TrashedList';
import { useLocation } from 'react-router-dom';
import { setView } from '../features/action/actionSlice';
import Toast from '../components/Toast';
import Search from '../components/Search';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Note = () => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.action);
  const location = useLocation();

  useEffect(() => {
    dispatch(listenForNotes());
  }, []);

  useEffect(() => {
    const hash = location.hash && location.hash.split('#')[1];
    const cView = hash.split('/')[0];
    dispatch(setView(cView || 'note'));
  }, [location]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ x: 100 }}
      >
        <Container>
          <Nav />
          {view === 'note' && <NoteList />}
          {view === 'archive' && <ArchivedList />}
          {view === 'trash' && <TrashedList />}
          {view === 'search' && <Search />}
          <CreateNote />
          <AddEditLabels />
          <ViewNote />
          <Navbar />
          <Toast />
          <NavTippy>
            <Tooltip id="nav" place="top" />
          </NavTippy>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default Note;

export const NoteWrap = styled.div``;

const NavTippy = styled.div`
  #nav {
    color: ${(props) => props.theme.colors.isActive};
    background-color: ${(props) => props.theme.colors.isActiveBg};
    box-shadow: ${(props) => props.theme.colors.shadow2};
  }
`;
