import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Labels from './Labels';

import Note from './Note';

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);
  // Filter notes into two arrays: pinned and unpinned
  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  // Sort pinned notes by date in descending order
  pinnedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div>
      <Labels />
      <NoteListWrap>
        {!!pinnedNotes.length && (
          <section>
            <h2>Pinned</h2>
            <PinnedNotes className="note-wrap">
              {pinnedNotes?.map((note) => (
                <Note note={note} key={note.id} />
              ))}
            </PinnedNotes>
          </section>
        )}
        <section>
          {!!pinnedNotes.length && <h2>Others</h2>}
          <OtherNotes className="note-wrap">
            {otherNotes?.map((note) => (
              <Note note={note} key={note.id} />
            ))}
          </OtherNotes>
        </section>
      </NoteListWrap>
    </div>
  );
};

export default NoteList;

const NoteListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 50px;
  .note-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 25px;
    list-style: none;
  }
  section {
    h2 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
      margin-left: 20px;
      color: #444;
    }
  }
`;

const PinnedNotes = styled.div``;
const OtherNotes = styled.div``;
