import React from 'react';

function TextArea({ commentText, id, content, handleChange, commentCharCount, maxTxt }) {
  const renderCharCount = () => (
    <span>{commentCharCount[id] || content.length}/{maxTxt}</span>
  );

  return (
    <section className="edit-reply-inner">
      <textarea
        name="textarea"
        className="edit-textarea"
        value={commentText[id] || content}
        onChange={(e) => handleChange(e, id)}
      />
      {renderCharCount()}
    </section>
  );
}

export default TextArea;
