import React from 'react'
import Sections from './Sections'

export default function EditWrapper({ 
      id, plusIcon, minusIcon, 
      deleteIcon,replyIcon,score,
      commentIndex, handleLike, handleUnlike, 
      handleToggleDelete, handleEditToggle, handleToggle,
      username, isCurrentUser, editIcon
      }) {
     
      return (
            <div className="reply-wrapper">
                  <div className="scores-wrapper">
                       <button className='plus-btn'>
                              <img
                                    src={plusIcon}
                                    alt="plus-icon"
                                    onClick={() => handleLike(id)}
                              />
                       </button>
                        <span className="scores">{score}</span>
                        <button className='minus-btn'>
                              <img
                                    className='minus'
                                    src={minusIcon}
                                    alt="minus-icon"
                                    onClick={() => handleUnlike(id)}
                              />
                        </button>
                  </div>
                  <Sections className="delete-and-edit-wrapper">
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
                  </Sections>
            </div>
      )
}
