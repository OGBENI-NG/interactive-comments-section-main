import React from "react";
import Sections from "./Components/Sections";
import data from "./data.json"
import plusIcon from "/images/icon-plus.svg"
import minusIcon from "./images/icon-minus.svg"
import editIcon from "./images/icon-edit.svg"
import deleteIcon from "./images/icon-delete.svg"
import replyIcon from "./images/icon-reply.svg"


export default function App() {
  const { currentUser, comments } = data;


  function renderCommentsDate(){
    return (
      <div className="main-inner">
        {comments.map(userData => (
          <div className="main-container"  key={userData.id}>
            <div className="username-wrapper">
              <img className="user-img" src={userData.user.image.png} alt={userData.user.username} />
              <p className="username">{userData.user.username}</p>
              <span className="created">{userData.createdAt}</span>
            </div>
            <p className="content">{userData.content}</p>
            <div className="reply-wrapper">
              <div className="scores-wrapper">
                <img src={plusIcon} alt="plus-icon" />
                <span className="scores">{userData.score}</span>
                <img src={minusIcon} alt="minus-icon" />
              </div>
              <span className="reply">
                <img src={replyIcon} alt="reply-icon" />
                reply
              </span>
            </div>
            {userData.replies.map(reply => (
              <div key={reply.id} className="reply-wrapper">
                <div className="reply-wrapper-inner">
                  <div  className="username-wrapper">
                    <img src={reply.user.image.png} alt={reply.user.username} />
                    <p className="username">{reply.user.username}</p>
                    <p  
                      className={`you`}
                      style={{display: reply.user.username === "juliusomo" ? "" : "none"}}
                    >you</p>
                    <span className="">{reply.createdAt}</span>
                  </div>
                  <p className="content reply-to">@{reply.replyingTo} <span>{reply.content}</span></p>
                  <div className="reply-wrapper">
                    <img src={plusIcon} alt="plus-icon" />
                    <span className="scores">{reply.score}</span>
                    <img src={minusIcon} alt="minus-icon" />
                    <span className="reply">
                      <img src={replyIcon} alt="reply-icon" />
                      reply
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }


  return(
    <div>
      <Sections className="main">
       {renderCommentsDate()}
      </Sections>
    </div>
  )
}