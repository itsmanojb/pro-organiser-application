import React, { useState } from 'react';

export const AddColumn = ({ handleAdd, handleClose }) => {
  const [columnName, setColumnName] = useState('');

  function handleAddColumn() {
    if (!columnName) {
      handleClose();
    } else {
      handleAdd(columnName);
    }
  }

  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleAddColumn();
    }
  }

  return (
    <div className="column__item--input">
      <input type="text"
        autoFocus
        autoComplete="off"
        placeholder="Column name"
        value={columnName}
        name="column_name"
        id="column_name"
        onChange={e => setColumnName(e.target.value)}
        onBlur={handleAddColumn}
        onKeyPress={keyPressed}
      />
    </div>
  );
};
