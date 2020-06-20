import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from 'context/Auth';
import { getBoards } from 'utils/data';

import { Alert } from 'common/alert/Alert';
import { LineLoader } from 'common/loader/LineLoader';
import SideNav from 'components/sidenav/Sidenav';
import RightPanel from 'components/right-panel/RightPanel';
import { Team } from 'components/misc/Team';

import './Dashboard.scss';
import Icon from '../../../components/misc/IonIcon';

export const Dashboard = (props) => {

  useEffect(() => {
    document.title = 'Dashboard - TaskForce'
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {

    getBoards(currentUser.email)
      .then((boards) => {
        setBoards(boards);
        setLoading(false);
      })
      .catch(() => {
        setBoards([]);
      });
  }, [currentUser, props.update]);

  return (
    <>
      {loading && <LineLoader />}
      <main className="content">
        <div className="dashboard">
          <div>
            <SideNav />
          </div>
          <div className="all-boards">
            {boards.length === 0 ? (
              <Alert type="info" isClosable={false}>
                You haven't created any boards. Kindly click on the 'Create a
                Board' button in the navigation bar to create a board.
              </Alert>
            ) : (
                <>
                  <div className="board-header">
                    <div className="menubar">
                      <div className="view-buttons">
                        <button onClick={(e) => setGridView(true)} className={gridView ? 'active' : ''}>
                          <Icon name="grid-outline" />
                        </button>
                        <button onClick={(e) => setGridView(false)} className={gridView ? '' : 'active'}>
                          <Icon name="list-outline" />
                        </button>
                      </div>
                      <div className="control-buttons">
                        <div className="control">
                          <label htmlFor="">Sort By</label>
                          <select name="" id="">
                            <option value="">Completion</option>
                            <option value="">Progress</option>
                            <option value="">Activity</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={gridView ? 'boards-listing grid' : 'boards-listing'}>
                    <div className="boards">
                      {boards.map((board) => {
                        return (
                          <Link
                            to={{
                              pathname: `/s/board/${board.id}`,
                              state: { boardName: board.name }
                            }}
                            key={board.id}
                            className="board" >
                            <div className="board-name">{board.name}</div>
                            <div className="board-type">
                              <span>{board.type}</span>
                            </div>
                            <div className="board-desc">
                              <p>6 cards</p>
                              <p>16 tasks</p>
                              <p>70% completion</p>
                            </div>
                            <ul className="board-members">
                              {board.teamMembers.map(name => <Team name={name} key={name} />)}
                            </ul>
                            <span className="meta">1 day ago</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
          </div>
          <div>
            <RightPanel />
          </div>
        </div>
      </main>
    </>
  );
};
