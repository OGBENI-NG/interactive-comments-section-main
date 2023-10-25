import React,{useEffect} from "react";

function TextArea({ commentText, id, content, handleChange, commentCharCount, maxTxt, textAreaRef, setFocus }) {
      useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }, [textAreaRef]);
    
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
    
    