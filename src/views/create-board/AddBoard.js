import React, { useState, useContext } from 'react';
import { addBoard } from '../../utils/data';
import { Alert } from '../../common/alert/Alert';
import { AuthContext } from '../../context/Auth';

export const AddBoard = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const saveBoard = () => {
    if (!name && !teamMember) {
      return setError('Name and Team Members are required fields');
    }

    const teamMembers = teamMember.split(',').map((el) => el.trim());

    const newBoard = {
      user: currentUser.email,
      name,
      teamMembers,
      type,
    };

    addBoard(newBoard)
      .then((created) => {
        if (created) {
          history.push('/');
        } else {
          setError('Could not add Board');
        }
      })
      .catch((err) => {
        setError('Could not add Board. Some error occured.');
      });
  };

  function handleClose(isClose) {
    if (isClose) {
      setError('');
    }
  }

  return (
    <div>
      {error && (
        <Alert canClose={handleClose} type={'error'}>
          {error}
        </Alert>
      )}
      <h2>Create a board</h2>
      <div>
        <label htmlFor="name">Enter a name for your board</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="eg. Agile Sprint Board"
        />
      </div>
      <div>
        <label htmlFor="team">Add your Team members</label>
        <input
          type="text"
          name="team"
          id="team"
          value={teamMember}
          onChange={(e) => setTeamMember(e.target.value)}
          placeholder="Add your team members(separated by commas)"
        />
      </div>
      <div>
        <label htmlFor="type">Enter the type for your board</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="eg. Design UX"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={saveBoard}
          id="CreateBoard"
        >
          Create
        </button>
      </div>
    </div>
  );
};
