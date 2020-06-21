import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from 'context/Auth';
import { ProjectContext } from 'context/Project';
import { getBoards } from 'utils/data';

import { LineLoader } from 'common/loader/LineLoader';
import SideNav from 'components/sidenav/Sidenav';
import RightPanel from 'components/right-panel/RightPanel';
import ProjectSelector from 'components/project/ProjectSelector';
import { Team } from 'components/misc/Team';

import Icon from 'components/misc/IonIcon';
import './Dashboard.scss';

export const Dashboard = ({ update }) => {

  useEffect(() => {
    document.title = 'Dashboard - TaskForce'
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [currentProject] = useContext(ProjectContext);
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
  }, [currentUser, update]);

  return (
    <>
      {loading && <LineLoader />}
      <main className="content">
        <div className="dashboard">
          <div>
            <SideNav />
          </div>
          <div className="all-boards">
            {!currentProject ? <ProjectSelector update={update} />
              : <>
                {boards.length === 0 ?
                  <div className="no-boards">
                    You haven't created any boards. To get started kindly click on the 'Create New Board'.
                  </div>
                  : <>
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
                }
              </>}
          </div>
          <div>
            <RightPanel />
          </div>
        </div>
      </main>
    </>
  );
};
