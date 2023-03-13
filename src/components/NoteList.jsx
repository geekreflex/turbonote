import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Note from './Note';

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);

  return (
    <div>
      <NoteListWrap>
        {notes?.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </NoteListWrap>
    </div>
  );
};

export default NoteList;

export const NoteListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  list-style: none;
  margin-top: 20px;
  margin-bottom: 150px;
`;
