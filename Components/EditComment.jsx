import React from 'react'

export default function EditComment({ 
      id, plusIcon, minusIcon, 
      deleteIcon,replyIcon,score,
      commentIndex, handleLike, handleUnlike, 
      handleToggleDelete, handleEditToggle, handleToggle,
      username, isCurrentUser, editIcon
      }) {
     
      return (
            <div className="reply-wrapper">
                  <div className="scores-wrapper">
                       <button className='plus-icon'>
                              <img
                                    src={plusIcon}
                                    alt="plus-icon"
                                    onClick={() => handleLike(id)}
                              />
                       </button>
                        <span className="scores">{score}</span>
                        <button className='minus-icon'>
                              <img
                                    src={minusIcon}
                                    alt="minus-icon"
                                    onClick={() => handleUnlike(id)}
                              />
                        </button>
                  </div>
                  {username === isCurrentUser ? (
                        <div className="edit-wrapper">
                              <button className="del-btn" onClick={() => handleToggleDelete(id)}>
                                    <img src={deleteIcon} alt="delete-icon" />
                                    delete
                              </button>
                              <button className="edit-btn" onClick={() => handleEditToggle(id)}>
                                    <img src={editIcon} alt="edit-icon"  />
                                    edit
                              </button>
                        </div>
                        ) : (
                        <button className="reply" onClick={() => handleToggle(commentIndex)}>
                              <img src={replyIcon} alt="reply-icon" />
                              reply
                        </button>
                  )}
            </div>
      )
}
