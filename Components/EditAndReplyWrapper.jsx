import React from 'react';
import Sections from './Sections';

export default function EditWrapper({
      id, plusIcon, minusIcon, deleteIcon,
      replyIcon, score, commentIndex, handleLike,
      handleUnlike, handleToggleDelete, handleEditToggle,       
      handleToggle, username, isCurrentUser, editIcon,
      }) {

      const currentUser = username === isCurrentUser;

      const renderScoreButtons = () => (
      <div className="scores-wrapper">
            <button className="plus-btn" onClick={() => handleLike(id)}>
                  <img className="plus" src={plusIcon} alt="plus-icon" />
            </button>
            <span className="scores">{score}</span>
            <button className="minus-btn" onClick={() => handleUnlike(id)}>
                  <img className="minus" src={minusIcon} alt="minus-icon" />
            </button>
      </div>
  );

  const renderEditButtons = () => (
      <div className="edit-wrapper">
            <button className="del-btn" onClick={() => handleToggleDelete(id)}>
                  <img src={deleteIcon} alt="delete-icon" />delete
            </button>
            <button  className="edit-btn" onClick={() => handleEditToggle(id)}>
                  <img src={editIcon} alt="edit-icon" />edit
            </button>
      </div>
  );

  const renderReplyButton = () => (
      <div className='toggle-reply'>
            <button className="reply" onClick={() => handleToggle(commentIndex)}>
                  <img className='reply-icon' src={replyIcon} alt="reply-icon" />reply
            </button>
      </div>
      
  );

  return (
    <div className='score-and-reply-wrapper'>
      {renderScoreButtons()}

     {currentUser ?  (
      <div className="delete-and-edit-wrapper">
            {renderEditButtons()}
      </div>
      ) : (
      <div >
            {renderReplyButton()} 
      </div>
      )}
      
      
    </div>
  );
}
