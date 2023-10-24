import React from 'react';

const UsernameWrapper = ({ imageSrc, altText, username, isCurrentUser, formattedTime }) => (
      <div className="username-wrapper">
            <img className="user-img" src={imageSrc} alt={altText} />
            <p className="username">{username}</p>
            <p 
                  className={`you`} 
                  style={{ display: username === isCurrentUser ? "" : "none" }}>
                  you
            </p>
            <span className="date">{formattedTime}</span>
      </div>
);

export default UsernameWrapper;
