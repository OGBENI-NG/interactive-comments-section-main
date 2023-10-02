import React, { useState } from 'react';
import Sections from './Sections';
import classNames from 'classnames';

function ReplyTextarea({ textArea, className, messageText, maxTxt, handleChange, onBtnClick, currentUser, sectionClassName, buttonValue, isOpen, ...props }) {
  const [localToggle, setLocalToggle] = useState(false);

  const allClassNames = classNames(className);

  const handleToggle = () => {
    setLocalToggle(!localToggle);
    onBtnClick(); // Call the provided callback function
  };

  return (
    <Sections className={sectionClassName} {...props}>
      <span>
        {messageText.length}/{maxTxt}
      </span>
      <textarea
        value={textArea}
        onChange={handleChange}
        placeholder="Add a comment..."
      />
      <div className="add-comment-inner">
        <img src={currentUser.image.webp} alt="user-image" />
        <button className={allClassNames} onClick={handleToggle}>
          {buttonValue}
        </button>
      </div>
    </Sections>
  );
}

export default ReplyTextarea;
