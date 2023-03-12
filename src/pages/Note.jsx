import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
import { listenForNotes } from '../features/note/noteSlice';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Container } from '../styles/GlobalStyles';

const Note = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenForNotes());
  }, []);
  return (
    <div>
      <Container>
        <NoteList />
        <CreateNote />
        <Navbar />
      </Container>
    </div>
  );
};

export default Note;

export const NoteWrap = styled.div``;
