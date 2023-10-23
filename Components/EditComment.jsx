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
                        <img
                              src={plusIcon}
                              alt="plus-icon"
                              onClick={() => handleLike(id)}
                        />
                        <span className="scores">{score}</span>
                        <img
                              src={minusIcon}
                              alt="minus-icon"
                              onClick={() => handleUnlike(id)}
                        />
                  </div>
                  {username === isCurrentUser ? (
                        <div className="edit-wrapper">
                              <p className="del-btn" onClick={() => handleToggleDelete(id)}>
                                    <img src={deleteIcon} alt="delete-icon" />
                                    delete
                              </p>
                              <p className="edit-btn" onClick={() => handleEditToggle(id)}>
                                    <img src={editIcon} alt="edit-icon"  />
                                    edit
                              </p>
                        </div>
                        ) : (
                        <span className="reply" onClick={() => handleToggle(commentIndex)}>
                              <img src={replyIcon} alt="reply-icon" />
                              reply
                        </span>
                  )}
            </div>
      )
}
