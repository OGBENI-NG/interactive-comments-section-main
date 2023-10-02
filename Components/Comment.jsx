import React, { useState, useContext, useRef, useEffect } from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import Sections from "./Sections";
import ReplyTextarea from "./ReplyTextarea";
import data from "../data";

function Comment({ comment, index }) {
  const { user, id, createdAt, content } = comment;
  const { currentUser } = data;
  const [textArea, setTextArea] = useState("");
  const [messageText, setMessageText] = useState("");
  const maxTxt = 120;
  const [score, setScore] = useState(comment.score || 0);
  const [liked, setLiked] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleLike = () => {
    if (!liked) {
      setScore(score + 1);
      setLiked(true);
    }
  };

  const handleUnlike = () => {
    if (liked) {
      setScore(score - 1);
      setLiked(false);
    }
  };

  const handleToggle = () => {
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index));
  };

  const handleChange = (e) => {
    const currentValue = e.target.value;
    setMessageText(currentValue);
    if (currentValue.length > 0) {
      const newValue =
        currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
      setTextArea(newValue);
    } else {
      setTextArea("");
    }
  };

  const handSend = () => {
    console.log("reply sent");
    handleToggle()
  };

  // Ref to store the wrapper div of each Comment
  const commentWrapperRef = useRef(null);

  // Effect to handle click outside of the ReplyTextarea
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentWrapperRef.current && !commentWrapperRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={commentWrapperRef}>
      <Sections className="main-container" key={id}>
        <div className="username-wrapper">
          <img className="user-img" src={user.image.png} alt={user.username} />
          <p className="username">{user.username}</p>
          <span className="created">{createdAt}</span>
        </div>
        <p className="content">{content}</p>
        <div className="reply-wrapper">
          <div className="scores-wrapper">
            <img src={plusIcon} alt="plus-icon" onClick={handleLike} />
            <span className="scores">{score}</span>
            <img src={minusIcon} alt="minus-icon" onClick={handleUnlike} />
          </div>
          <span className="reply" onClick={handleToggle}>
            <img src={replyIcon} alt="reply-icon" />
            reply
          </span>
        </div>
      </Sections>
      {openIndex === index && (
        <Sections className="reply-comment">
          <ReplyTextarea
            textArea={textArea}
            handleChange={handleChange}
            maxTxt={maxTxt}
            messageText={messageText}
            currentUser={currentUser}
            buttonValue={"reply"}
            onBtnClick={handSend}
            className={"reply-btn"}
            sectionClassName={"reply-section"}
          />
        </Sections>
      )}
    </div>
  );
}

export default Comment;
