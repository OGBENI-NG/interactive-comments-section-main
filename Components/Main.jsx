import React from 'react'
import data from '../data.json'
import Sections from './Sections'

import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import editIcon from "../images/icon-edit.svg"
import deleteIcon from "../images/icon-delete.svg"
import replyIcon from "../images/icon-reply.svg"

function Main({userData}) {
      const {comments} = data
      
      return (
            <div>
              {comments.map((userData) => (
                <div className="main-container" key={userData.id}>
                  <div className="username-wrapper">
                    <img className="user-img" src={userData.user.image} alt={userData.user.username} />
                    <p className="username">{userData.user.username}</p>
                    <span className="created">{userData.createdAt}</span>
                  </div>
                  <p className="content">{userData.content}</p>
                  <div className="reply-wrapper">
                    <div className="scores-wrapper">
                      <img src={plusIcon} alt="plus-icon" />
                      <span className="scores">{userData.score}</span>
                      <img src={minusIcon} alt="minus-icon" />
                    </div>
                    <span className="reply">
                      <img src={replyIcon} alt="reply-icon" />
                      reply
                    </span>
                  </div>
                </div>
              ))}
            </div>
      );
}

export default Main