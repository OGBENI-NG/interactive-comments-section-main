
import React from 'react';
import Sections from './Sections';

const DeleteModal = ({ display, handleCancel, handleDelete, style }) => {
  return (
    <Sections className="delete-modal" style={style}>
      <section className={`delete-notify-wrapper ${display && "open-modal"}`}>
      <h2>Delete comment</h2>
      <p>
        Are you sure you want to delete this comment?
        This will remove the comment and can't be undone.
      </p>
      <section className="modal-btn-wrapper">
        <button className="modal-cancel-btn" onClick={handleCancel}>no, cancel</button>
        <button className="modal-delete-btn" onClick={handleDelete}>yes, delete</button>
      </section>
    </section>
    </Sections>
  );
};

export default DeleteModal;