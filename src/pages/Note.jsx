import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
import { listenForNotes } from '../features/note/noteSlice';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ViewNote from '../components/ViewNote';
import AddEditLabels from '../components/AddEditLabels';
import ArchivedList from '../components/ArchivedList';
import TrashedList from '../components/TrashedList';
import { useLocation } from 'react-router-dom';
import { setView } from '../features/action/actionSlice';
import Toast from '../components/Toast';
import Search from '../components/Search';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Layout from '../components/Layout';

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
    <Layout name="note">
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
        <Tooltip id="pin" place="bottom" className="tooltip" />
        <Tooltip id="nav" place="top" className="tooltip" />
        <Tooltip id="nact" place="bottom" className="tooltip" />
      </NavTippy>
    </Layout>
  );
};

export default Note;

export const NoteWrap = styled.div``;

const NavTippy = styled.div`
  .tooltip {
    color: ${(props) => props.theme.colors.isActive};
    background-color: ${(props) => props.theme.colors.isActiveBg};
    box-shadow: ${(props) => props.theme.colors.shadow2};
    font-size: 12px;
    font-weight: 600;
    z-index: 998;
  }

  @media (max-width: 768px) {
    .tooltip {
      display: none;
    }
  }
`;
