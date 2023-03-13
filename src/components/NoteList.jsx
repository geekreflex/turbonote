import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Labels from './Labels';

import Note from './Note';

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);
  // Filter notes into two arrays: pinned and unpinned
  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);

  // Sort pinned notes by date in descending order
  pinnedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Concatenate pinned and unpinned notes
  const sortedNotes = [...pinnedNotes, ...unpinnedNotes];

  return (
    <div>
      <Labels />
      <NoteListWrap>
        {sortedNotes?.map((note) => (
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
