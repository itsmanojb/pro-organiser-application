import React from 'react';
import './Modal.scss';

export const Modal = ({ children }) => {
  return (
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>
  );
};
