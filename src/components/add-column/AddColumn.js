import React, { useState } from 'react';
import { Modal } from '../../common/modal/Modal';

export const AddColumn = ({ handleAdd, handleClose }) => {
  const [columnName, setColumnName] = useState('');

  function handleAddCloumn() {
    if (!columnName) {
      return alert('Enter a column name');
    }

    handleAdd(columnName);
  }

  return (
    <Modal>
      <div>
        <div>Add Column</div>
        <div onClick={handleClose}>
          &times;
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="column_name">Enter a Column Name:</label>
          <input
            type="text"
            value={columnName}
            name="column_name"
            id="column_name"
            onChange={e => setColumnName(e.target.value)}
          />
        </div>
        <div>
          <button
            id="CreateColumn"
            onClick={handleAddCloumn}
          >
            Add Column
          </button>
        </div>
      </div>
    </Modal>
  );
};
