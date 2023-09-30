import React, {useState} from "react"
import Sections from "./Components/Sections"
import data from "./data"
import CommentSection from "./Components/CommentSection"


export default function App() {
  const { currentUser, comments } = data
  const [textArea , setTextArea] = useState('')
  const [messageText, setMessageText] = useState('')
  const maxTxt = 120

  function handleChange(e) {
    const currentValue = e.target.value
    // Check if the textarea has any content
    setMessageText(currentValue)
    if(currentValue.length > 0) {
      // Convert the first letter to uppercase
      const newValue = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
      setTextArea(newValue)
    } else {
      setTextArea('')
    }
  }

  return (
    <div className="main">
     <Sections>
        <div className="main-inner">
          {comments.map((comment) => (
            <CommentSection key={comment.id} comment={comment} />
          ))}
        </div>
      </Sections>
      <Sections className="add-comment-wrapper">
        <span>{messageText.length}/{maxTxt}</span>
        <textarea 
          value={textArea} 
          placeholder="Add a comment..."
          onChange={handleChange}
        />
        <div className="add-comment-inner">
          <img src={currentUser.image.webp} alt="user-image" />
          <button>send</button>
        </div>
      </Sections>
    </div>
  );
}
