import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../features/note/noteSlice';

const CreateNote = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    dispatch(createNote({ title, content }));
  };
  return (
    <div>
      <h3>Create Note</h3>
      <div>
        <form onSubmit={handleCreateNote}>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title..."
            />
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note Conten..."
            />
          </div>
          <button>Create Note</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
