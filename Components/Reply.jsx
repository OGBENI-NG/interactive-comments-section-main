// Reply.js
import React from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import deleteIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";

function Reply({ reply }) {
  return (
    <div key={reply.id} className="main-container">
      <div className="username-wrapper reply-names-wrapper">
        <img className="user-img" src={reply.user.image.png} alt={reply.user.username} />
        <p className="username reply-username">{reply.user.username}</p>
        <p className={`you`} style={{ display: reply.user.username === "juliusomo" ? "" : "none" }}>
          you
        </p>
        <span className="date">{reply.createdAt}</span>
      </div>
      <p className="content reply-to">
        @{reply.replyingTo} <span>{reply.content}</span>
      </p>
      <div className="reply-wrapper">
        <div className="scores-wrapper">
          <img src={plusIcon} alt="plus-icon" />
          <span className="scores">{reply.score}</span>
          <img src={minusIcon} alt="minus-icon" />
        </div>
        {reply.user.username === "juliusomo" ? (
          <div className="edit-wrapper">
            <p className="del-btn">
              <img src={deleteIcon} alt="delete-icon" />
              delete
            </p>
            <p className="edit-btn">
              <img src={editIcon} alt="edit-icon" />
              edit
            </p>
          </div>
        ) : (
          <span className="reply">
            <img src={replyIcon} alt="reply-icon" />
            reply
          </span>
        )}
      </div>
    </div>
  );
}

export default Reply;
