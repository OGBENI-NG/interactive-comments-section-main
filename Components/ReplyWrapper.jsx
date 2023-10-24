import React from 'react'
import Sections from './Sections'

export default function ReplyWrapper(
      {     
            id, 
            openIndex, 
            commentIndex,
            isCurrentUser,
            username,
            commentCharCount,
            maxTxt,
            handleChange,
            currentUser,
            createdAt,
            commentText,
            handleReplyComment,
            
      }) {
     
      return (
      
      <Sections
            className={`reply-section-inner ${openIndex === commentIndex && 'open'}`} 
            style={{display: username === isCurrentUser ? "none" : ""}}
      >
      <span style={{display: !commentCharCount[id] || 0 < 0 ? "none" : ""}}
      >{commentCharCount[id] || 0}/{maxTxt}
      </span>
      <textarea
            name="textarea"
            value={commentText[id] || ""}
            onChange={(e) => handleChange(e, id)}
            placeholder="Add a comment..."
      />
      <div className="add-comment-inner">
            <img src={currentUser.image.webp} alt="user-image" />
            <button 
                  onClick={() => handleReplyComment(id, username, commentIndex, createdAt)} 
                  className="reply reply-btn"
            >reply</button>
      </div>
      </Sections>
    
  )
}
