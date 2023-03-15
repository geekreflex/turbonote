import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Empty from './Empty';
import Note from './Note';
import ViewWrap from './ViewWrap';

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);
  // Filter notes into two arrays: pinned and unpinned
  const unarchivedNotes = notes.filter(
    (note) => !note.archived && !note.trashed
  );
  const pinnedNotes = unarchivedNotes.filter((note) => note.pinned);
  const otherNotes = unarchivedNotes.filter((note) => !note.pinned);

  // Sort pinned notes by date in descending order
  pinnedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (pinnedNotes.length === 0 && otherNotes.length === 0) {
    return <Empty type="note" />;
  }

  return (
    <ViewWrap>
      <NoteListWrap>
        {!!pinnedNotes.length && (
          <section>
            <h2>Pinned</h2>
            <div className="note-wrap">
              {pinnedNotes?.map((note) => (
                <Note note={note} key={note.id} />
              ))}
            </div>
          </section>
        )}
        <section>
          {!!pinnedNotes.length && <h2>Others</h2>}
          <div className="note-wrap">
            {otherNotes?.map((note) => (
              <Note note={note} key={note.id} />
            ))}
          </div>
        </section>
      </NoteListWrap>
    </ViewWrap>
  );
};

export default NoteList;

const NoteListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 100px;
  margin-bottom: 100px;
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
      color: ${(props) => props.theme.colors.text2};
    }
  }
`;
