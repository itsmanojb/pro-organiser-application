import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from 'context/Auth';
import { getBoards } from 'utils/data';

import { Alert } from 'common/alert/Alert';
import { Loader } from 'common/loader/Loader';
import SideNav from 'components/sidenav/Sidenav';
import RightPanel from 'components/right-panel/RightPanel';
import { Team } from 'components/misc/Team';

import './Dashboard.scss';

export const Dashboard = (props) => {

  useEffect(() => {
    document.title = 'Dashboard - TaskForce'
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

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
      {loading ? (
        <Loader />
      ) : (
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
                      </div>
                      <div className="boards-listing grid">
                        <div className="boards">
                          {boards.map((board) => {
                            return (
                              <Link to={'/s/board/' + board.id} key={board.id} className="board" >
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
        )}
    </>
  );
};
