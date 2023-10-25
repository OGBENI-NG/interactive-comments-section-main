function TextArea({ commentText, id, content, handleChange, commentCharCount, maxTxt}) {
      const { textAreaRef } = useCustomHook(initialValue);
    
      return (
        <section className="edit-reply-inner">
          <textarea
            name="textarea"
            className="edit-textarea"
            value={commentText[id] || content}
            onChange={(e) => handleChange(e, id)}
            ref={textAreaRef}
          />
          <span>{commentCharCount[id] || content.length}/{maxTxt}</span>
        </section>
      );
    }
    
    export default TextArea;
    