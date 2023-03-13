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

const Note = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenForNotes());
  }, []);
  return (
    <div>
      <Container>
        <Logo>
          <Link to="/">
            <span>🚀</span>
            Turbo Note
          </Link>
        </Logo>
        <NoteList />
        <CreateNote />
        <ViewNote />
        <Navbar />
      </Container>
    </div>
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
