import React, { useState, useContext } from 'react';
import { addBoard } from 'utils/data';
import { AuthContext } from 'context/Auth';
import { ToastsContext } from 'context/Toasts';
import Icon from 'components/misc/IonIcon';

import './AddNew.scss';

export const AddBoard = ({ added, closed }) => {

  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [type, setType] = useState('');

  const [toasts, setToasts] = useContext(ToastsContext);

  const saveBoard = () => {
    if (!name && !teamMember) {
      showError('Please fill mandatory (*) fields');
      return;
    }

    const teamMembers = teamMember.split(',').map((el) => el.trim());
    const newBoard = {
      user: currentUser.email,
      name,
      teamMembers,
      type,
    };

    setFormSubmitted(true);
    addBoard(newBoard).then((created) => {
      if (created) {
        added(new Date().getTime());
      } else {
        showError('Failed to add this board');
        return;
      }
    })
      .catch(() => {
        showError('Could not add Board. Some error occured.');
        return;
      });
  };

  const goBack = () => {
    closed();
  }

  const showError = (message) => {
    setFormSubmitted(false);
    setToasts([
      ...toasts,
      {
        message,
        id: toasts.length,
        title: 'Error',
        backgroundColor: '#d9534f',
        icon: 'warning'
      }
    ]);
  }

  return (
    <main className="content">
      <div className="modal-page-ui new-board">
        <button className="close" onClick={() => goBack()}>
          <Icon name="close" />
        </button>
        <div className="modal-page-content">
          <h2>Create a board</h2>
          <div className="floating">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Board's name"
              className="floating__input"
              autoComplete="off"
            />
            <label htmlFor="name" className="floating__label" data-content="Board's name *">
              <span className="hidden--visually">Board's name</span>
            </label>
          </div>
          <div className="floating">
            <input
              type="text"
              name="team"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              id="team"
              placeholder="Add team members"
              className="floating__input"
              autoComplete="off"
            />
            <label htmlFor="team" className="floating__label" data-content="Add team members *">
              <span className="hidden--visually">Add team members</span>
            </label>
          </div>
          <div className="help-block">
            Use comma (,) as separator
        </div>
          <div className="floating">
            <input
              type="text"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="type"
              placeholder="Board type (eg. Design UX)"
              className="floating__input"
              autoComplete="off"
            />
            <label htmlFor="type" className="floating__label" data-content="Board type (eg. Design UX)">
              <span className="hidden--visually">Board type (eg. Design UX)</span>
            </label>
          </div>
          <div className="form-buttons">
            <button type="submit" onClick={saveBoard} disabled={formSubmitted} id="CreateBoard" className="button">
              {formSubmitted ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
