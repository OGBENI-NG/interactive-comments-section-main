import React from 'react'
import Comment from './Comment'
import Reply from './Reply'
import Sections from './Sections'

export default function CommentSection({comment}) {
  return (
      <Sections key={comment.id}>
            <Comment comment={comment} />
            <div className="replies-container">
                  {comment.replies.map((reply) => 
                        <Reply key={reply.id} reply={reply} />
                  )}
            </div>
      </Sections>
  )
}
