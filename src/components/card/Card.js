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
      <li className="card__item"
        onDragStart={e => dragStart(e, card)}
        draggable
        onClick={() => setIsDetails(true)}>
        <span className="card__tag card__tag--orange">High</span>
        <span className="card__tag card__tag--green">Low </span>
        <h6 className="card__title">{card.title}</h6>
        <ol className="card__actions">
          <li className="card__actions--wrapper">
            <i className="far fa-check-square"></i><span className="card__actions--text">1/4</span></li>
          <ol className="card__avatars">
            {members}
          </ol>
        </ol>
      </li>
      {isDetails && detailsModal}
    </>
  );
};
