import React from 'react';
import Sections from './Sections';

const DeleteModal = ({ display, handleCancel, handleDelete, style }) => {
  const renderModalContent = () => (
    <Sections>
      <h2>Delete comment</h2>
      <p>
        Are you sure you want to delete this comment?
        This will remove the comment and can't be undone.
      </p>
      <Sections className="modal-btn-wrapper">
        <button className="modal-cancel-btn" onClick={handleCancel}>
          no, cancel
        </button>
        <button className="modal-delete-btn" onClick={handleDelete}>
          yes, delete
        </button>
      </Sections>
    </Sections>
  );

  return (
    <Sections className="delete-modal" style={style}>
      <Sections className={`delete-notify-wrapper ${display && "open-modal"}`}>
        {renderModalContent()}
      </Sections>
    </Sections>
  );
};

export default DeleteModal;
