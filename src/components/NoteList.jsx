import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Note from './Note';

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);

  return (
    <NoteListWrap>
      {notes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </NoteListWrap>
  );
};

export default NoteList;

export const NoteListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
