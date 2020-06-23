import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from 'context/Auth';
import { ProjectContext } from 'context/Project';
import { getBoards } from 'utils/data';

import { LineLoader } from 'common/loader/LineLoader';
import SideNav from 'components/sidenav/Sidenav';
import ProjectPanel from 'components/right-panel/ProjectPanel';

import { Team } from 'components/misc/Team';
import Icon from 'components/misc/IonIcon';

export const ProjectDashboard = (update) => {

  const { currentUser } = useContext(AuthContext);
  const [currentProject] = useContext(ProjectContext);
  const [gridView, setGridView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (currentProject) {
      setLoading(true);
      getBoards(currentUser.email, currentProject.id)
        .then((boards) => {
          setBoards(boards);
          setLoading(false);
        }).catch(() => {
          setBoards([]);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser, currentProject, update]);

  return (
    <>
      {loading && <LineLoader />}
      <main className="content">
        <div className="dashboard">
          <div><SideNav /></div>
          <div className="all-boards">
            {!loading ? <>
              {boards.length === 0 ?
                <div className="no-boards">You haven't created any boards. To get started kindly click on the 'Create New Board'.</div>
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
                              {/* <p>6 cards</p>
                              <p>16 tasks</p>
                              <p>70% completion</p> */}
                            </div>
                            <div className="board-footer">
                              <ul className="board-members">
                                {board.teamMembers.map(name => <Team name={name} key={name} />)}
                              </ul>
                              <span className="meta">1 day ago</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              }
            </> :
              <div className="inner-loading-text">
                Loading boards ...
              </div>
            }
          </div>
          <div><ProjectPanel project={currentProject} update={update} /></div>
        </div>
      </main>
    </>
  );
};