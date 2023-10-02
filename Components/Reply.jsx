import React, { useState } from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import deleteIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";

function Reply({ reply }) {
  const { user, id, createdAt, content, replyingTo, score } = reply;
  const isCurrentUser = user.username === "juliusomo";

  // State to manage the score and whether the user has liked the reply
  const [replyScore, setReplyScore] = useState(score || 0);
  const [replyLiked, setReplyLiked] = useState(false);

  // Function to handle like action
  const handleReplyLike = () => {
    if (!replyLiked) {
      setReplyScore(replyScore + 1);
      setReplyLiked(true);
    }
  };

  // Function to handle unlike action
  const handleReplyUnlike = () => {
    if (replyLiked) {
      setReplyScore(replyScore - 1);
      setReplyLiked(false);
    }
  };

  return (
    <div key={id} className="main-container">
      <div className="username-wrapper reply-names-wrapper">
        <img className="user-img" src={user.image.png} alt={user.username} />
        <p className="username reply-username">{user.username}</p>
        <p
          className={`you`}
          style={{ display: isCurrentUser ? "" : "none" }}
        >
          you
        </p>
        <span className="date">{createdAt}</span>
      </div>
      <p className="content reply-to">
        @{replyingTo} <span>{content}</span>
      </p>
      <div className="reply-wrapper">
        <div className="scores-wrapper">
          <img
            src={plusIcon}
            alt="plus-icon"
            onClick={handleReplyLike}
            
          />
          <span className="scores">{replyScore}</span>
          <img
            src={minusIcon}
            alt="minus-icon"
            onClick={handleReplyUnlike}
            
          />
        </div>
        {isCurrentUser ? (
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
