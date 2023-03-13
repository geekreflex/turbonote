import { useRef } from 'react';

export function AutoResizableTextarea(props) {
  const textareaRef = useRef(null);

  const handleTextareaChange = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };

  return (
    <textarea
      ref={textareaRef}
      style={{ height: 'auto', overflowY: 'hidden' }}
      onInput={handleTextareaChange}
      {...props}
    />
  );
}
