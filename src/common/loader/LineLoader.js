import React from 'react';
import './Loader.scss';

export const LineLoader = () => {
  return (
    <div className="progress abs">
      <div className="indeterminate"></div>
    </div>
  );
};
