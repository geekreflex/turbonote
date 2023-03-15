import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PaperIcon from './icons/PaperIcon';
import Note from './Note';

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
    return (
      <NoNote>
        <span>
          <PaperIcon />
        </span>
        <p>You don't have any notes yet.</p>
      </NoNote>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ y: 100, opacity: 0 }}
      >
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
      </motion.div>
    </AnimatePresence>
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
      color: ${(props) => props.theme.colors.text2};
    }
  }
`;

const NoNote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
  gap: 10px;

  span {
    font-size: 150px;
    color: #777;
    display: flex;
  }

  p {
    font-size: 20px;
    font-weight: 400;
    color: #888;
  }
`;
