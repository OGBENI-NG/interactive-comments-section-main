import React, { useState } from "react"
import Sections from "./Components/Sections"
import data from "./data"
import Comment from "./Components/Comment"
import Reply from "./Components/Reply"
import ReplyTextarea from "./Components/ReplyTextarea"

export default function App() {
  const { currentUser, comments } = data
  const [textArea, setTextArea] = useState('')
  const [messageText, setMessageText] = useState('')
  const maxTxt = 120

  function handleChange(e) {
    const currentValue = e.target.value
    setMessageText(currentValue)
    if (currentValue.length > 0) {
      const newValue =
        currentValue.charAt(0).toUpperCase() + currentValue.slice(1)
      setTextArea(newValue)
    } else {
      setTextArea('')
    }
  }
  function handSend() {
    console.log("send comment")
  }

  function renderComments(comments) {
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))
  }

  function renderReplies(replies) {
    return replies.map((reply) => (
      <Reply key={reply.id} reply={reply} />
    ))
  }

  return (
    <div className="main">
      <Sections>
        <div className="main-inner">
          {renderComments(comments)}
          {comments.map((comment, index) => (
            <div key={comment.id} className="replies-container" index={index}>
              {comment.replies && renderReplies(comment.replies)}
            </div>
          ))}
        </div>
      </Sections>
      <ReplyTextarea
        textArea={textArea}
        handleChange={handleChange}
        maxTxt={maxTxt}
        messageText={messageText}
        currentUser={currentUser}
        buttonValue={"send"}
        onBtnClick={handSend}
        className={"send-btn"}
        sectionClassName={"add-comment-wrapper"}
      />
    </div>
  )
}
