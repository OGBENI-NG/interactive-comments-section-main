// Comment.js
import React from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";

function Comment({ comment }) {
  return (
    <div className="main-container" key={comment.id}>
      <div className="username-wrapper">
        <img className="user-img" src={comment.user.image.png} alt={comment.user.username} />
        <p className="username">{comment.user.username}</p>
        <span className="created">{comment.createdAt}</span>
      </div>
      <p className="content">{comment.content}</p>
      <div className="reply-wrapper">
        <div className="scores-wrapper">
          <img src={plusIcon} alt="plus-icon" />
          <span className="scores">{comment.score}</span>
          <img src={minusIcon} alt="minus-icon" />
        </div>
        <span className="reply">
          <img src={replyIcon} alt="reply-icon" />
          reply
        </span>
      </div>
    </div>
  );
}

export default Comment;
