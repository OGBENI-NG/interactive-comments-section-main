import React from 'react';
import Sections from './Sections';

function TextArea({ commentText, id, content, handleChange, commentCharCount, maxTxt }) {
  const renderCharCount = () => (
    <span>{commentCharCount[id] || content.length}/{maxTxt}</span>
  );

  return (
    <Sections className="edit-reply-inner">
      <textarea
        name="textarea"
        className="edit-textarea"
        value={commentText[id] || content}
        onChange={(e) => handleChange(e, id)}
      />
      {renderCharCount()}
    </Sections>
  );
}

export default TextArea;
