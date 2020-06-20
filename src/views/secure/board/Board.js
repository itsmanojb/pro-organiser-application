import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as shortid from 'shortid';

import { ToastsContext } from 'context/Toasts';

import { Loader } from 'common/loader/Loader';
import { Card } from 'components/cards/Card';
import { AddCard } from 'components/cards/AddCard';
import { AddColumn } from 'components/cards/AddColumn';
import ColumnHead from 'components/cards/ColumnHead';
import Icon from 'components/misc/IonIcon';

import { createDeepCopy } from 'utils/utility';

import {
  getBoard, getColumns, addColumn, updateColumn, renameColumn,
  deleteColumn, renameBoard, deleteBoard
} from 'utils/data';
import './Board.scss';

export const Board = ({ history }) => {

  let { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [isColumnAdd, setIsColumnAdd] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isCardAdd, setIsCardAdd] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const [inEditCard, setInEditCard] = useState(null);
  const [boardName, setBoardName] = useState({});
  const [boardNamePlaceholder, setBoardNamePlaceholder] = useState('');
  const [boardNameEdit, setBoardNameEdit] = useState(false);
  const [toasts, setToasts] = useContext(ToastsContext);

  useEffect(() => {
    (async function () {
      const data = await getBoard(name);
      setBoard(data);
      setBoardName(data.name);
      setBoardNamePlaceholder(data.name);
      await getAllColumns(data.id, setColumns);
      setLoading(false);
    })();
  }, [name]);

  const showError = (message) => {
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

  function handleAddCloumn(columnName) {
    const newColumn = {
      boardId: board.id,
      name: columnName,
      cards: [],
      created: Date.now(),
    };

    addColumn(newColumn)
      .then((value) => {
        if (value) {
          newColumn['id'] = value;
          setColumns([...columns, newColumn]);
          setIsColumnAdd(false);
        }
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  async function addCard(card) {
    try {
      card['id'] = shortid();
      const cards = [...selectedColumn.cards, card];
      const uColumn = createDeepCopy(selectedColumn);
      uColumn.cards = cards;
      const val = await updateColumn(uColumn.id, uColumn);
      if (val) {
        afterUpdateColumn(columns, selectedColumn, uColumn, setColumns);
        setIsCardAdd(false);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleCardEdit(upCard) {
    try {
      const card = { id: inEditCard.id, ...upCard };
      const uColumn = createDeepCopy(selectedColumn);
      const cards = selectedColumn.cards.filter((c) => c.id !== inEditCard.id);
      const newCards = [...cards, card];
      uColumn.cards = newCards;
      const val = await updateColumn(selectedColumn.id, uColumn);
      if (val) {
        afterUpdateColumn(columns, selectedColumn, uColumn, setColumns);
        setIsAdd(true);
        setIsCardAdd(false);
        setSelectedColumn(null);
        setInEditCard(null);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleCardArchive(card, column) {
    try {
      card.isArchive = true;
      const newCards = column.cards.filter((c) => c.id !== card.id);
      const upColumn = createDeepCopy(column);
      upColumn.cards = [...newCards, card];
      const val = await updateColumn(column.id, upColumn);
      if (val) {
        afterUpdateColumn(columns, column, upColumn, setColumns);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleCardCompletion(card, column) {
    try {
      card.isCompleted = true;
      const newCards = column.cards.filter((c) => c.id !== card.id);
      const upColumn = createDeepCopy(column);
      upColumn.cards = [...newCards, card];
      const val = await updateColumn(column.id, upColumn);
      if (val) {
        afterUpdateColumn(columns, column, upColumn, setColumns);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function onDragDrop(ev, newColumn) {
    try {
      const card = JSON.parse(ev.dataTransfer.getData('card'));
      const oldColumn = JSON.parse(ev.dataTransfer.getData('columnFrom'));
      if (oldColumn.id === newColumn.id) {
        return;
      }
      oldColumn.cards = oldColumn.cards.filter((c) => c.id !== card.id);
      const val = await updateColumn(oldColumn.id, oldColumn);
      newColumn.cards = [...newColumn.cards, card];
      const val1 = await updateColumn(newColumn.id, newColumn);
      if (val && val1) {
        const newCols = columns.filter(
          (col) => col.id !== oldColumn.id && col.id !== newColumn.id
        );
        const sortedCols = [...newCols, oldColumn, newColumn].sort(
          (a, b) => a.created - b.created
        );
        setColumns(sortedCols);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleBoardRename(newName) {
    const renamed = await renameBoard(board.id, newName);
    if (renamed) {
      setBoardNameEdit(false);
      setBoardName(newName);
      setBoardNamePlaceholder(newName);
    }
  }

  function cancelNewColumn() {
    setIsColumnAdd(false);
  }

  function openAddCard(column) {
    setIsAdd(true);
    setIsCardAdd(true);
    setSelectedColumn(column);
    setInEditCard(null);
  }

  function openCardEdit(card, column) {
    setIsAdd(false);
    setIsCardAdd(true);
    setSelectedColumn(column);
    setInEditCard(card);
  }

  function handleDeleteColumn(column) {
    const newCols = columns
      .filter((c) => c.id !== column.id)
      .sort((a, b) => a.created - b.created);
    deleteColumn(column.id)
      .then(() => {
        setColumns(newCols);
      })
      .catch((err) => {
        showError(err.message);
      });
  }

  function handleRenameColumn(column, newName) {
    renameColumn(column.id, newName);
  }

  async function handleBoardDelete() {
    if (window.confirm('Are you sure you want to delete the board?')) {
      setLoading(true);
      await Promise.all(
        columns.map(async (c) => {
          await deleteColumn(c.id);
        })
      );
      const val = await deleteBoard(board.id);
      if (val) {
        history.push('/');
      }
    }
  }

  // board name edit
  function doBoardRename() {
    if (!boardName) {
      setBoardNameEdit(false);
      setBoardName(boardNamePlaceholder);
    } else {
      handleBoardRename(boardName);
    }
  }

  function keyPressed(event) {
    if (event.key === 'Enter') {
      doBoardRename();
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <main className="content">
            <div className="board-header">
              <div className="board-name-editable">
                {boardNameEdit
                  ?
                  <div className="edit-view">
                    <input type="text"
                      autoFocus
                      value={boardName}
                      placeholder={boardNamePlaceholder}
                      onChange={e => setBoardName(e.target.value)}
                      onBlur={doBoardRename}
                      onKeyPress={keyPressed}
                      autoComplete="off"
                    />
                    {/* <span>save</span> */}
                  </div>
                  : <div className="no-edit">
                    <h2 onDoubleClick={() => setBoardNameEdit(true)}>{boardName}</h2>
                  </div>
                }
              </div>
              <button onClick={handleBoardDelete} className="button inline bg-red sm">
                Delete Board
              </button>
            </div>
            <div className="trello-board">
              <ul className="column__list">
                {columns.map((column) => {
                  return (
                    <li
                      className="column__item"
                      key={column.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        onDragDrop(e, column);
                      }}
                    >
                      <div className="column__title--wrapper">
                        <ColumnHead name={column.name} renameColumn={(newName) => handleRenameColumn(column, newName)} />
                        <span className="btn" onClick={(e) => handleDeleteColumn(column)}>
                          <Icon name="trash-outline" />
                        </span>
                      </div>
                      <ul className="card__list">
                        {column.cards.map(
                          (card) =>
                            !card.isArchive && (
                              <Card
                                card={card}
                                board={board}
                                key={card.id}
                                handleEdit={() => openCardEdit(card, column)}
                                handleArchive={() => handleCardArchive(card, column)}
                                handleCompletion={() => handleCardCompletion(card, column)}
                                column={column}
                              />
                            )
                        )}
                      </ul>
                      <div className="column__item--cta" onClick={() => openAddCard(column)}>
                        <Icon name="add"></Icon>
                        <span>Add a card</span>
                      </div>
                    </li>
                  );
                })}
                <li className="column__item trans">
                  {isColumnAdd ? (
                    <AddColumn handleClose={cancelNewColumn} handleAdd={handleAddCloumn} />
                  ) : (
                      <div className="column__item--new">
                        <button onClick={() => setIsColumnAdd(true)}>Add Column</button>
                      </div>
                    )}
                </li>
              </ul>
            </div>
          </main>
        )}
      {isCardAdd && (
        <AddCard
          board={board}
          handleCardAdd={addCard}
          handleClose={() => setIsCardAdd(false)}
          isAdd={isAdd}
          card={inEditCard}
          handleEdit={handleCardEdit}
        />
      )}
    </>
  );
};

function afterUpdateColumn(columns, selectedColumn, upColumn, setColumns) {
  const filColumns = columns.filter((cl) => cl.id !== selectedColumn.id);
  const newColumns = [...filColumns, upColumn];
  newColumns.sort((a, b) => a.created - b.created);
  setColumns(newColumns);
}

async function getAllColumns(id, setColumns) {
  const resCols = await getColumns(id);
  setColumns(resCols);
}