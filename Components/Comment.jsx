import React  from "react"
import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import replyIcon from "../images/icon-reply.svg"
import editIcon from "../images/icon-edit.svg"
import deleteIcon from "../images/icon-delete.svg"
import checkMark from "../images/check-mark.svg"
import Sections from "./Sections"
import {formatTimeDistance, parseISO} from "../utilities"
import useCustomHook from "../Hooks/CustomHook"
import DeleteModal from "./DeleteModal"
import TextArea from "./TextArea"
import EditAndReplyWrapper from "./EditAndReplyWrapper"
import ReplyWrapper from "./ReplyWrapper"
import CurrentUserWrapper from "./CurrentUserWrapper"


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
    handleCancelDelete, showNotify, notifyText
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
          <div 
            className={`comment-section-wrapper ${editingCommentId === id &&       "update-wrapper"}`}>
              <div className="comment-section-inner">
                <CurrentUserWrapper
                  imageSrc={image.png}
                  altText={username}
                  username={username}
                  isCurrentUser={isCurrentUser}
                  formattedTime={formattedTime}
                />
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
              <EditAndReplyWrapper
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
        <Sections>
          {/* modal for delete new comment */}
          {username === isCurrentUser && (
            <DeleteModal
              display={toggleDeleteCommentId === id}
              handleCancel={() => handleCancelDelete(id)}
              handleDelete={() => handleDeleteComment(id)}
              className={"delete-modal"}
              style={{display: toggleDeleteCommentId !== id && "none"}} 
            />
          )}
        </Sections>
        {openIndex === commentIndex && 
         <ReplyWrapper
          id={id}
          openIndex={openIndex}
          isCurrentUser={currentUser.image.webp}
          username={username}
          commentCharCount={commentCharCount}
          commentIndex={commentIndex}
          createdAt={createdAt}
          commentText={commentText}
          currentUser={currentUser}
          maxTxt={maxTxt}
          handleReplyComment={handleReplyComment}
          handleChange={handleChange}
          />
          //  new comments end here
        }
        {/* rendering the relies in comment */}
        {replies && replies.length > 0 && (
          <Sections className="reply-container-wrapper">
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
                  <Sections 
                    className={`reply-section  ${newReplies && "open-new-reply"}`}
                  >
                    <Sections className={`reply-section-wrapper ${editingCommentId === replyId  && "update-wrapper" }`}>
                      <div className="reply-inner">
                        <CurrentUserWrapper
                          imageSrc={replyImage.png}
                          altText={replyUsername}
                          username={replyUsername}
                          isCurrentUser={isCurrentUser}
                          formattedTime={
                            newCommentReplies.some((newReply) => newReply.id === replyId)
                              ? formatTimeDistance(parseISO(replyCreatedAt))
                              : replyCreatedAt
                          }
                        />

                        <Sections>
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
                              @{replyToUser} 
                              <span className="reply-content">{replyContent}</span>
                            </p>
                          )}
                        </Sections>
                      </div>
                      {editingCommentId === replyId ? (
                        <button 
                          className="update-btn"
                          onClick={() => handleUpdateCommentReply(id, replyId)}
                        >update</button>
                        ):(
                          <EditAndReplyWrapper 
                            id={replyId}
                            plusIcon={plusIcon}
                            minusIcon={minusIcon}
                            replyIcon={replyIcon}
                            deleteIcon={deleteIcon}
                            editIcon={editIcon}
                            username={replyUsername}
                            replyId={replyId}
                            handleLike={() => handleLike(id, true, replyId, replyIndex)}
                            handleUnlike={() => handleUnlike(id, true, replyId, replyIndex)}
                            handleToggle={() => handleToggle(replyIndex)}
                            handleEditToggle={handleEditToggle}
                            handleToggleDelete={handleToggleDelete}
                            score={replyScore}
                            isCurrentUser={isCurrentUser}
                            
                          />
                      )}
                    </Sections>
                  </Sections>
                  <Sections>
                    {replyUsername === isCurrentUser && (
                      <DeleteModal
                        display={toggleDeleteCommentId === replyId}
                        handleCancel={() => handleCancelDelete(id, replyId)}
                        handleDelete={() => handleDeleteReplyInComment(id, replyId)}
                        className={"delete-modal"}
                        style={{display: toggleDeleteCommentId !== replyId && "none"}} 
                      />
                    )}
                  </Sections>
                  {openIndex === replyIndex && 
                    <ReplyWrapper
                      id={replyId}
                      openIndex={replyIndex}
                      username={replyUsername}
                      createdAt={replyContent}
                      commentCharCount={commentCharCount}
                      commentIndex={replyIndex}
                      handleChange={handleChange}
                      commentText={commentText}
                      maxTxt={maxTxt}
                      currentUser={currentUser}
                      isCurrentUser={isCurrentUser}
                      handleReplyComment={() => handleReplyForReply(replyId, replyUsername)}
                    />
                  }
                  {/* render newReply in replies */}
                  <Sections className="new-reply-for-replies">
                    {newReplies
                      .filter((newReply) => newReply.replyingTo === replyUsername)
                      .map((newReply) => (
                      <div key={newReply.id}>
                        <Sections className={`reply-section ${slide &&"open-new-reply"}`}>
                        <div className={`reply-section-wrapper ${editingCommentId === newReply.id  && "update-wrapper" }`}>
                          <div className="reply-inner">
                            <CurrentUserWrapper
                              imageSrc={newReply.user.image.png}
                              altText={newReply.user.username}
                              username={newReply.user.username}
                              isCurrentUser={isCurrentUser}
                              formattedTime={formatTimeDistance(parseISO(newReply.createdAt))}
                            />
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
                                  @{newReply.replyingTo} 
                                  <span className="reply-content">{newReply.content}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          {editingCommentId === newReply.id ? (
                            <button
                              className="update-btn"
                              onClick={() => handleUpdateReplyForReply(newReply.id, replyIndex, replyId)}
                            >update</button>
                            ) : (
                            <EditAndReplyWrapper 
                              plusIcon={plusIcon}
                              minusIcon={minusIcon}
                              deleteIcon={deleteIcon}
                              user={newReply.user}
                              editIcon={editIcon}
                              username={newReply.username}
                              isCurrentUserReply={newReply.user.username === isCurrentUser}
                              id={newReply.id}
                              replyIndex={replyIndex}
                              score={newReply.score}
                              handleLike={() => handleLikeForReply(id, true, newReply.id, replyIndex)}
                              handleUnlike={() => handleUnlikeForReply(id, true, newReply.id, replyIndex)}
                              handleEditToggle={handleEditToggle}
                              handleToggleDelete={handleToggleDelete}
                              handleToggle={() => handleToggle(replyIndex)}
                              
                            />
                          )}
                        </div>
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
                  </Sections>
                </Sections>
            ))}
          </div>
          </Sections>
        )}
      </Sections>
    )
  })

  return (
    <div ref={commentWrapperRef}>
       {showNotify && (
        <div className={`reply-send-msg ${showNotify && "drop-down-notify"}`}>
          <img src={checkMark} alt="check-mark" />
          <p>{notifyText}</p>
        </div>
      )}
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
