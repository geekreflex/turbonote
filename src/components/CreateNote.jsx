import { useState } from 'react';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    const payload = {
      title,
      content,
    };
    console.log(payload);
  };

  return (
    <div>
      <form onSubmit={handleCreateNote}>
        <div>
          <input
            type="tetx"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button>Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
