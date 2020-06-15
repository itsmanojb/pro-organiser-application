import React, { useState } from 'react';
import { Team } from '../team-tags/Team';
import { Modal } from '../../common/modal/Modal';
import { convertDateToNice } from '../../utils/utility';

export const Card = ({ card, board, hanldeEdit, hanldeArchive, column }) => {
  const [isDetails, setIsDetails] = useState(false);
  const members = card.teamMembers.map(name => <Team name={name} key={name} />);
  const date = new Date(card.date);
  const dueDate = convertDateToNice(date);

  function doEdit() {
    setIsDetails(false);
    hanldeEdit();
  }

  function doArchive() {
    setIsDetails(false);
    hanldeArchive();
  }

  const detailsModal = (
    <Modal>
      <div>
        <div>
          {card.title}
          <div>
            in <span>{board.name}</span>
          </div>
        </div>
        <div>
          <button onClick={doEdit}>
            Edit
          </button>
          <button onClick={doArchive}>
            Archive
          </button>
        </div>
        <div onClick={() => setIsDetails(false)}>
          &times;
        </div>
      </div>
      <div>
        <div>
          <header>Description</header>
          <div>{card.description}</div>
        </div>
        <div>
          <header>Members</header>
          <div>{members}</div>
        </div>
        <div>
          <header>Due Date</header>
          <div>{dueDate}</div>
        </div>
      </div>
    </Modal>
  );

  function dragStart(ev, card) {
    ev.dataTransfer.setData("card", JSON.stringify(card));
    ev.dataTransfer.setData("columnFrom", JSON.stringify(column));
  }

  return (
    <>
      <li
        onDragStart={e => dragStart(e, card)}
        draggable
        onClick={() => setIsDetails(true)}
      >
        <div>{card.title}</div>
        <div>
          <div>
            <i
              className="material-icons"
              style={{ fontSize: '30px', cursor: 'move' }}
            >
              list
            </i>
          </div>
          <div>{members}</div>
        </div>
      </li>
      {isDetails && detailsModal}
    </>
  );
};
