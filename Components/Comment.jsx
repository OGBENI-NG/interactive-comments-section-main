import React  from "react"
import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import replyIcon from "../images/icon-reply.svg"
import editIcon from "../images/icon-edit.svg"
import deleteIcon from "../images/icon-delete.svg"
import Sections from "./Sections"
import {formatTimeDistance, parseISO} from "../utilities"
import useCustomHook from "../Hooks/CustomHook"
import DeleteModal from "./DeleteModal"
import TextArea from "./TextArea"
import EditComment from "./EditComment"

export default function Comment() {
  //all properties and elements of custom hooks console.log("typing..")
  const {
    comments, commentWrapperRef, handleToggle,
    openIndex, handleLike, handleUnlike, textArea,
    messageText, handleChangeSendNewComment, handleSendComment,
    isCurrentUser, commentText, handleUpdateComment,
    commentCharCount, newCommentReplies, newReplies,
    editingCommentId, handleChange, handleEditToggle,
    handleLikeForReply, handleUnlikeForReply, handleUpdateReplyForReply,
    handleReplyComment, handleUpdateCommentReply, handleReplyForReply,
    currentUser, data, maxTxt, handleDeleteComment, handleDeleteReplyInComment,
    slide, handleDeleteInReply, handleToggleDelete, toggleDeleteCommentId,
    handleCancelDelete
  } = useCustomHook(null)

  //comment section
  const commentsSection = comments.map(
    ({ id, user: { image, username }, replies, content, score, createdAt},  commentIndex
    ) => {
    // Assuming createdAt is a valid date string
    const formattedTime = commentIndex >= data.comments.length
      ? formatTimeDistance(parseISO(createdAt))
      : createdAt
    
    return (
      <Sections key={id}>
        {/* rendering comment and reply comment */}
        <Sections className={`comment-section ${slide && "open-new-comment"}`}>
          <div className="comment-section-wrapper">
            <div className="username-wrapper">
              <img
                className="user-img"
                src={image.png}
                alt={username}
              />
              <p className="username">{username}</p>
              <p
                className={`you`}
                style={{ display: username === isCurrentUser ? "" : "none" }}
              >
                you
              </p>
              <span 
                className="date"
              >{formattedTime}</span>
            </div>
            <div>
              <div>
                {editingCommentId === id ? (
                  <TextArea
                    id={id}
                    content={content}
                    handleChange={handleChange}
                    commentText={commentText}
                    commentCharCount={commentCharCount}
                    maxTxt={maxTxt}
                  />
                ) : (
                  <p className="content">{content}</p>
                )}
              </div>
            </div>
            {editingCommentId === id ? (
              <button 
                onClick={() => handleUpdateComment(id)} 
                className="update-btn"
              >update</button>
              ) : (
                <EditComment
                  id={id}
                  score={score}
                  plusIcon={plusIcon}
                  minusIcon={minusIcon}
                  replyIcon={replyIcon}
                  deleteIcon={deleteIcon}
                  editIcon={editIcon}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  username={username}
                  isCurrentUser={isCurrentUser}
                  handleEditToggle={handleEditToggle}
                  handleToggleDelete={handleToggleDelete}
                  handleToggle={handleToggle}
                  commentIndex={commentIndex}
                />
            )}
          </div>
        </Sections>
        {/* modal for delete new comment */}
        <div>
          {username === isCurrentUser && (
            <DeleteModal
              display={toggleDeleteCommentId === id}
              handleCancel={() => handleCancelDelete(id)}
              handleDelete={() => handleDeleteComment(id)}
              className={"delete-modal"}
              style={{display: toggleDeleteCommentId !== id && "none"}} 
            />
          )}
        </div>
        {openIndex === commentIndex && 
          <Sections
            className={`reply-section-inner ${openIndex === commentIndex && 'open'}`} 
            style={{display: username === isCurrentUser ? "none" : ""}}
          >
            <span 
              style={{display: !commentCharCount[id] || 0 < 0 ? "none" : ""}}
            >
              {commentCharCount[id] || 0}/{maxTxt}
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
              >
                reply
              </button>
            </div>
          </Sections>
          //  new comments end here
        }
        {/* rendering the relies in comment */}
        {replies && replies.length > 0 && (
          <div className="replies-container">
            {replies.map((
              { id: replyId, 
                createdAt: replyCreatedAt,
                score: replyScore, 
                content: replyContent, 
                replyingTo: replyToUser,
                user: { image: replyImage, username: replyUsername }, replyIndex
              }
              ) => (
                <Sections key={replyId}>
                  <Sections className={`reply-section  ${newReplies && "open"}`}>
                    <div className="username-wrapper reply-names-wrapper">
                      <img className="user-img" src={replyImage.png} alt={replyUsername} />
                      <p className="username reply-username">{replyUsername}</p>
                      <p
                        className={`you`}
                        style={{ display: replyUsername === isCurrentUser ? "" : "none" }}
                      >
                        you
                      </p>
                      <span 
                        className="date" 
    
                      >
                        {newCommentReplies.some((newReply) => newReply.id === replyId)
                          ? formatTimeDistance(parseISO(replyCreatedAt))
                          : replyCreatedAt
                        }
                      </span>
                    </div>
                    <div>
                      { editingCommentId === replyId ? (
                        <TextArea 
                          id={replyId}
                          handleChange={handleChange}
                          commentCharCount={commentCharCount}
                          content={replyContent}
                          maxTxt={maxTxt}
                          commentText={commentText}
                        />
                        
                      ) : (
                        <p className="content reply-to">
                          @{replyToUser} <span>{replyContent}</span>
                        </p>
                      )}
                    </div>
                    {editingCommentId === replyId ? (
                      <button 
                        className="update-btn"
                        onClick={() => handleUpdateCommentReply(id, replyId)}
                      >update</button>
                      ):(
                      <div className="reply-wrapper">
                        <div className="scores-wrapper-in-reply" >
                          <img
                            src={plusIcon}
                            alt="plus-icon"
                            onClick={() => handleLike(id, true, replyId, replyIndex)}
                          
                          />
                          <span className="scores-in-replies">{replyScore}</span>
                          <img
                            src={minusIcon}
                            alt="minus-icon"
                            onClick={() => handleUnlike(id, true, replyId, replyIndex)} 
                          />
                        </div>
                        {replyUsername === isCurrentUser ? (
                          <div className="edit-wrapper">
                            <p 
                              className="del-btn" 
                              onClick={() => handleToggleDelete(replyId)}
                            >
                              <img src={deleteIcon} alt="delete-icon" />
                              delete
                            </p>
                            <p className="edit-btn" onClick={() => handleEditToggle(replyId)}>
                              <img src={editIcon} alt="edit-icon" />
                              edit
                            </p>
                          </div>
                        ) : (
                          <span 
                            className="reply reply-in-replies"
                            onClick={() => handleToggle(replyIndex)}
                          >
                            <img src={replyIcon} alt="reply-icon" />
                            reply
                          </span>
                        )}
                      </div>
                    )}
                  </Sections>
                  <div>
                    {replyUsername === isCurrentUser && (
                      <DeleteModal
                        display={toggleDeleteCommentId === replyId}
                        handleCancel={() => handleCancelDelete(id, replyId)}
                        handleDelete={() => handleDeleteReplyInComment(id, replyId)}
                        className={"delete-modal"}
                        style={{display: toggleDeleteCommentId !== replyId && "none"}} 
                      />
                    )}
                  </div>
                  {openIndex === replyIndex && 
                    <Sections  
                      className={`reply-section-inner ${openIndex === replyIndex && "open"} `}
                      style={{display: replyUsername === isCurrentUser && "none"}}
                    >
                      <span
                        style={{display: !commentCharCount[replyId] || 0 < 0 ? "none" : ""}}
                      >
                      {commentCharCount[replyId] || 0}/{maxTxt}</span>
                      <textarea
                        value={commentText[replyId] || ""}
                        onChange={(e) => handleChange(e, replyId)}
                        placeholder="Add a comment..."
                      />

                      <div className="add-comment-inner">
                        <img src={currentUser.image.webp} alt="user-image" />
                        <button 
                          className="reply reply-btn"
                          onClick={() => handleReplyForReply(replyId, replyUsername)}
                        >
                          reply
                        </button>
                      </div>
                    </Sections>}
                    {/* render newReply in replies */}
                    <div className="new-reply-for-replies">
                    {newReplies
                      .filter((newReply) => newReply.replyingTo === replyUsername)
                      .map((newReply) => (
                      <div key={newReply.id}>
                        <Sections className={`reply-section ${slide ? "open" : ""}`}>
                          <div className="username-wrapper reply-names-wrapper">
                            <img className="user-img" src={newReply.user.image.png} alt={newReply.user.username} />
                            <p className="username reply-username">{newReply.user.username}</p>
                            <p
                              className={`you`}
                              style={{ display: newReply.user.username === isCurrentUser ? "" : "none" }}
                            >
                              you
                            </p>
                            <span 
                              className="date"
                            >
                              {formatTimeDistance(parseISO(newReply.createdAt))}
                            </span>
                          </div>
                          <div>
                            {editingCommentId === newReply.id ? (
                              <TextArea 
                                id={newReply.id}
                                commentCharCount={commentCharCount}
                                commentText={commentText}
                                content={newReply.content}
                                maxTxt={maxTxt}
                                handleChange={handleChange}
                              />
                            ) : (
                              <p className="content reply-to">
                                @{newReply.replyingTo} <span>{newReply.content}</span>
                              </p>
                            )}
                          </div>
                          {editingCommentId === newReply.id ? (
                            <button
                              className="update-btn"
                              onClick={() => handleUpdateReplyForReply(newReply.id, replyIndex, replyId)}
                            >update</button>
                            ) : (
                            <div className="reply-wrapper">
                              <div className="scores-wrapper-in-reply">
                                <img
                                  src={plusIcon}
                                  alt="plus-icon"
                                  onClick={() => handleLikeForReply(id, true, newReply.id, replyIndex)}

                                />
                                <span className="scores-in-replies">{newReply.score}</span>
                                <img
                                  src={minusIcon}
                                  alt="minus-icon"
                                  onClick={() => handleUnlikeForReply(id, true, newReply.id, replyIndex)}
                                />
                              </div>
                              {newReply.user.username === isCurrentUser ? (
                                <div className="edit-wrapper">
                                  <p className="del-btn" 
                                  onClick={() => handleToggleDelete(newReply.id)}
                                  
                                  >
                                    <img src={deleteIcon} alt="delete-icon" />
                                    delete
                                  </p>
                                  <p className="edit-btn" onClick={() => handleEditToggle(newReply.id)}>
                                    <img src={editIcon} alt="edit-icon" />
                                    edit
                                  </p>
                                </div>
                              ) : (
                                <span
                                  className="reply reply-in-replies"
                                  onClick={() => handleToggle(replyIndex)}
                                >
                                  <img src={replyIcon} alt="reply-icon" />
                                  reply
                                </span>
                              )}
                            </div>
                          )}
                        </Sections>
                        <div>
                          {newReply.user.username === isCurrentUser &&
                          <DeleteModal
                            display={toggleDeleteCommentId}
                            handleCancel={() => handleCancelDelete(newReply.id, replyId)}
                            handleDelete={() => handleDeleteInReply(newReply.id, replyId, newReply.username)}
                            className={"delete-modal"}
                            style={{display: toggleDeleteCommentId !== newReply.id && "none"}} 
                          />
                          }
                        </div>
                      </div>
                    ))} 
                  </div>
                </Sections>
            ))}
          </div>
        )}
      </Sections>
    )
  })

  return (
    
    <div ref={commentWrapperRef}>
      <Sections className="reply-comment">
        {commentsSection}
      </Sections>
      <Sections className="send-comment-wrapper">
        <span style={{display: messageText.length === 0 ? "none" : ""}}>
          {messageText.length}/{maxTxt}
        </span>
        <textarea
          name="textarea"
          value={textArea}
          onChange={handleChangeSendNewComment}
          placeholder="Add a comment..."
        />
        <div className="add-comment-inner">
          <img src={currentUser.image.webp} alt="user-image" />
          <button className="send-btn" onClick={handleSendComment}>
            send
          </button>
        </div>
      </Sections>
    </div>
  )
}
