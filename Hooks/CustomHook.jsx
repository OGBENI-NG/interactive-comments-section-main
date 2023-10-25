import { useRef, useEffect, useState, useCallback, useMemo} from 'react';
import data from '../data';

export default function useCustomHook(initialValue) {
  const commentWrapperRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(initialValue)
  const [textArea, setTextArea] = useState("");
  const [messageText, setMessageText] = useState("");
  const { currentUser } = data;
  const isCurrentUser = currentUser.username
  //const [comments, setComments] = useState(data.comments);
  const [commentText, setCommentText] = useState([])
  const [commentCharCount, setCommentCharCount] = useState({});
  //const [newReplies, setNewReplies] = useState([]);
  //const [newCommentReplies, setNewCommentReplies] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [toggleDeleteCommentId, setToggleDeleteCommentId] = useState(null);
  const [slide, setSlide] = useState(false)
  const maxTxt = 250;
  const textAreaRef = useRef(null);

  // Initialize state with values from localStorage or use default values
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem('comments');
    return storedComments ? JSON.parse(storedComments) : [];
  });

  const [newCommentReplies, setNewCommentReplies] = useState(() => {
    const storedNewCommentReplies = localStorage.getItem('newCommentReplies');
    return storedNewCommentReplies ? JSON.parse(storedNewCommentReplies) : [];
  });

  const [newReplies, setNewReplies] = useState(() => {
    const storedNewReplies = localStorage.getItem('newReplies');
    return storedNewReplies ? JSON.parse(storedNewReplies) : [];
  });

  
  // Use useCallback for functions that shouldn't trigger unnecessary rerenders
  const handleToggle = useCallback((index) => {
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index));
  }, []);

  const handleEditToggle = useCallback((commentId) => {
    setEditingCommentId(commentId);
  }, []);

  const handleToggleDelete = useCallback((commentId) => {
    setToggleDeleteCommentId(commentId);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setToggleDeleteCommentId(null);
  }, []);

  //handle like comments
  const handleLike = useCallback((commentId, isReply, replyId) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (isReply && comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === replyId) {
                const newScore = reply.liked ? reply.score : reply.score + 1;
                return { ...reply, score: newScore, liked: true };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          } else if (!isReply) {
            const newScore = comment.liked ? comment.score : comment.score + 1;
            return { ...comment, score: newScore, liked: true };
          }
        }
        return comment;
      });
      return updatedComments;
    });
  }, [setComments])
 
  //handle unlike comments
  const handleUnlike = useCallback((commentId, isReply, replyId) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (isReply && comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === replyId) {
                const newScore = reply.liked ? reply.score - 1 : reply.score;
                return { ...reply, score: newScore, liked: false };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          } else if (!isReply) {
            const newScore = comment.liked ? comment.score - 1 : comment.score;
            return { ...comment, score: newScore, liked: false };
          }
        }
        return comment;
      });
      return updatedComments;
    });
  }, [setComments]);
 
  const handleLikeForReply = useCallback((commentId, isReply, replyId) => {
    setNewReplies((prevReplies) =>
    prevReplies.map((reply) => {
      if (reply.id === replyId) {
        const newScore = reply.liked ? reply.score : reply.score + 1;
        return { ...reply, score: newScore, liked: true };
      }
      return reply;
    })
  );
  }, [setNewReplies]);

  const handleUnlikeForReply = useCallback((commentId, isReply, replyId) => {
    setNewReplies((prevReplies) =>
      prevReplies.map((reply) => {
        if (reply.id === replyId) {
          const newScore = reply.liked ? reply.score - 1 : reply.score;
          return { ...reply, score: newScore, liked: false };
        }
        return reply;
      })
    );
  }, [setNewReplies]);
  

  const handleChange = useCallback((e, commentId) => {
    const currentValue = e.target.value;
    const charCount = currentValue.length;
    setCommentCharCount((prevCharCount) => ({ ...prevCharCount, [commentId]: charCount }));

    const newValue = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
    setCommentText((prevText) => ({ ...prevText, [commentId]: newValue }));
  }, [setCommentCharCount, setCommentText]);

  const handleChangeSendNewComment = useCallback((e) => {
    const currentValue = e.target.value;
    setMessageText(currentValue);
    const newValue = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
    setTextArea(newValue);
  }, [setMessageText, setTextArea]);
    
  //handle send new comments
  const handleSendComment = useCallback(() => {
    // ... (same logic as before)
    const content = textArea
    // Check if the content is not an empty string
    if (content.trim() === '') {
      // Do not add an empty reply
      return;
    }
    if (textArea.trim() !== "") {
      const now = new Date();
      const newComment = {
        id: now.getTime(),
        content: textArea,
        createdAt: now.toISOString(),
        score: 0,
        liked: false,
        user: {
          image: currentUser.image,
          username: currentUser.username,
        },
      };

      setComments([...comments, newComment]);
      setTextArea("");
      setMessageText("");
      handleToggle(false)
      setSlide(true)
    }
  }, [comments, textArea, handleToggle, setSlide]);

  const handleReplyComment = useCallback((commentId, replyingToUser) => {
    const now = new Date();
    const content = commentText[commentId] || '';
  
    // Check if the content is not an empty string
    if (content.trim() === '') {
      // Do not add an empty reply
      return;
    }
    const newReply = {
      id: now.getTime(),
      content: content,
      createdAt: now.toISOString(),
      score: 0,
      liked: false,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      replyingTo: replyingToUser,
    };
  
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies ? [newReply, ...comment.replies] : [newReply];
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });
      return updatedComments;
    });
    setNewCommentReplies((prevNewCommentReplies) => [...prevNewCommentReplies, newReply]);
  
    // Clear the specific commentId in the commentText state
    setCommentText((prevText) => ({ ...prevText, [commentId]: '' }));
    // Clear the specific commentId in the commentCharCount state
    setCommentCharCount((prevCharCount) => ({ ...prevCharCount, [commentId]: 0 }));
    handleToggle(false);
    setSlide(false)
    setToggleDeleteCommentId(null)
  }, [comments, commentText, handleToggle, setSlide, setToggleDeleteCommentId]);
 
  //handle update comment in textarea
  const handleUpdateComment = useCallback((commentId) => {
    const commentToUpdate = comments.find(comment => comment.id === commentId);
    
    // Check if the text is empty or unchanged
    if (!commentText[commentId] || commentText[commentId] === commentToUpdate.content) {
      // If empty or unchanged, exit the function
      setEditingCommentId(null);
      setToggleDeleteCommentId(null)
      return;
    }
  
    // Update Comment Function
      const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, content: commentText[commentId] }
        : comment
    );

    // Update state with the new comments
    setComments(updatedComments);
  
    // Clear the specific commentId in the commentText state
    setCommentText((prevText) => ({ ...prevText, [commentId]: '' }));
    // Clear the specific commentId in the commentCharCount state
    setCommentCharCount((prevCharCount) => ({ ...prevCharCount, [commentId]: 0 }));
  
    // Add any other logic you need
    setEditingCommentId(null);
    setToggleDeleteCommentId(null)
  }, [comments, commentText, setEditingCommentId, setToggleDeleteCommentId]);

  const handleUpdateCommentReply = useCallback((commentId, replyId) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, content: commentText[replyId] || reply.content };
            }
            return reply;
          });
  
          return { ...comment, replies: updatedReplies };
        }
  
        return comment;
      });
  
      return updatedComments;
    });
  
    // Clear the specific replyId in the commentText state
    setCommentText((prevText) => ({ ...prevText, [replyId]: '' }));
  
    // Clear the specific replyId in the commentCharCount state
    setCommentCharCount((prevCharCount) => ({ ...prevCharCount, [replyId]: 0 }));
  
    // Add any other logic you need
    setToggleDeleteCommentId(null);
    setEditingCommentId(null);
  
  }, [setCommentText, setCommentCharCount, setEditingCommentId, commentText]);
  
 
  const handleReplyForReply = useCallback((replyId, replyingToUser) => {
    const content = commentText[replyId] || ''
  
    // Check if the content is not an empty string
    if (content.trim() === '') {
      // Do not add an empty reply
      return;
    }
    const now = new Date();
    const newReply = {
      id: now.getTime(),
      content: content,
      createdAt: now.toISOString(),
      score: 0,
      liked: false,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      replyingTo: replyingToUser,
    };
  
    // Update comments state
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === replyId) {
          const updatedReplies = [...(comment.replies || []), newReply];
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  
    // Update newReplies state only if the new reply is not already present
    setNewReplies((prevNewReplies) =>
      prevNewReplies.some((existingReply) => existingReply.id === newReply.id)
        ? prevNewReplies
        : [newReply, ...prevNewReplies]
    );
  
    // Clear the specific replyId in the commentText state
    setCommentText((prevText) => ({ ...prevText, [replyId]: '' }));
    // Clear the specific replyId in the commentCharCount state
    setCommentCharCount((prevCharCount) => ({ ...prevCharCount, [replyId]: 0 }));
    setEditingCommentId(null);
    setToggleDeleteCommentId(false)
    handleToggle(false);
    setSlide(true)
  }, [comments, commentText, setNewReplies, handleToggle, setSlide, setToggleDeleteCommentId]);

  const handleUpdateReplyForReply = useCallback((replyId) => {
     // Assuming you have a way to get the updated content from state
     const updatedContent = commentText[replyId];
  
     setNewReplies((prevReplies) =>
       prevReplies.map((reply) =>
         reply.id === replyId ? { ...reply, content: updatedContent || reply.content } : reply
       )
       );
       
       // Clear the specific replyId in the commentText state
     setCommentText((prevText) => ({
       ...prevText,
       [replyId]: updatedContent || prevText[replyId] || '',
     }));
     // Clear the specific replyId in the commentCharCount state
     setCommentCharCount((prevCharCount) => ({ ...prevCharCount, [replyId]: 0 }));
     // Add any other logic you need
     setEditingCommentId(null);
     setToggleDeleteCommentId(null)
  }, [commentText, setNewReplies, setCommentText, setCommentCharCount, setEditingCommentId, setToggleDeleteCommentId]);

  const handleClickOutside = useCallback((event) => {
    if (commentWrapperRef.current && !commentWrapperRef.current.contains(event.target)) {
      setOpenIndex(null);
    }
  }, [commentWrapperRef, handleToggle]);
 
  const handleDeleteComment = useCallback((commentId, replyId) => {
     // You can add a confirmation dialog or any other checks here before deleting
     setComments((prevComments) => {
      // Filter out the comment with the specified commentId
      const updatedComments = prevComments.filter((comment) => comment.id !== commentId);
  
      return updatedComments;
    });
  }, [setComments]);
 
  const handleDeleteReplyInComment = useCallback((commentId, replyId) => {
    // Remove the newReply from the newCommentReplies state
    setNewCommentReplies((prevNewCommentReplies) =>
      prevNewCommentReplies.filter((reply) => reply.id !== replyId)
    );
  
    // Update the comments state to remove the newReply from the comment's replies
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  }, [setNewCommentReplies, setComments]);

  const handleDeleteInReply = useCallback((replyId) => {
    // Update the comments state to remove the deleted reply
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.replies) {
          // Filter out the reply with the specified replyId
          const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  
    // Update the newReplies state to remove the deleted reply
    setNewReplies((prevNewReplies) =>
      prevNewReplies.filter((newReply) => newReply.id !== replyId)
    );
  
  }, [setComments, setNewReplies]);

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('newCommentReplies', JSON.stringify(newCommentReplies));
    localStorage.setItem('newReplies', JSON.stringify(newReplies));
  }, [comments, newCommentReplies, newReplies]);
  

  // Use useMemo for functions that don't depend on changing state
  const memoizedValues = useMemo(() => ({
    commentWrapperRef, handleToggle, openIndex, comments,
    handleLike, handleUnlike, textArea, handleChangeSendNewComment,
    messageText, handleSendComment, isCurrentUser, commentText,
    handleUpdateComment, commentCharCount, newCommentReplies, newReplies,
    editingCommentId, handleChange, handleEditToggle, handleLikeForReply,
    handleUnlikeForReply, handleUpdateReplyForReply, handleReplyComment, 
    handleUpdateCommentReply, handleReplyForReply, currentUser, data,
    maxTxt, handleDeleteComment, handleDeleteReplyInComment, slide,
    handleDeleteInReply, handleToggleDelete, toggleDeleteCommentId,
    handleCancelDelete, textAreaRef
  }), 
  [
    commentWrapperRef, handleToggle, openIndex, comments,
    handleLike, handleUnlike, textArea, handleChangeSendNewComment,
    messageText, handleSendComment, isCurrentUser, commentText,
    handleUpdateComment, commentCharCount, newCommentReplies, newReplies,
    editingCommentId, handleChange, handleEditToggle, handleLikeForReply,
    handleUnlikeForReply, handleUpdateReplyForReply, handleReplyComment, 
    handleUpdateCommentReply, handleReplyForReply, currentUser, data,
    maxTxt, handleDeleteComment, handleDeleteReplyInComment, slide,
    handleDeleteInReply, handleToggleDelete, toggleDeleteCommentId, 
    handleCancelDelete, textAreaRef
  ]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return memoizedValues;
}
