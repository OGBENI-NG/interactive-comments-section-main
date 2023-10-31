import React from 'react';
import Sections from './Sections';

export default function ReplyWrapper({
      id, openIndex, commentIndex, isCurrentUser,
      username, commentCharCount,  maxTxt, handleChange,
      currentUser, createdAt, commentText, handleReplyComment,
      }) {
      const shouldDisplay = username === isCurrentUser;

      const renderCharCount = () => (
            <span style={{ display: !commentCharCount[id] || commentCharCount[id] < 0 ? 'none' : '' }}>
                  {commentCharCount[id] || 0}/{maxTxt}
            </span>
      );

      return (
      <Sections 
            className={`reply-section-inner ${openIndex === commentIndex && 'open-new-reply'}`} 
            style={{ display: shouldDisplay ? 'none' : '' }}
      >
            {renderCharCount()}
           
           
            <div className='reply-wrapper'>
                  <img className='user-image' src={currentUser.image.webp} alt="user-image" />
                  <textarea
                        // name="textarea"
                        value={commentText[id] || ''}
                        onChange={(e) => handleChange(e, id)}
                        placeholder="Add a comment..."
                  />
                  <button 
                        onClick={() => handleReplyComment(id, username, commentIndex, createdAt)} 
                        className="reply-btn"
                  >reply
                  </button>
            </div>
            
      </Sections>
      );
}
