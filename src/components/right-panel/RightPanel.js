import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from 'context/Auth';
import { getProjects } from 'utils/data';
import './Rightpanel.scss';

const RightPanel = ({ update }) => {

  const { currentUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async function () {
      const projects = await getProjects(currentUser.email);
      setProjects(projects);
      // await getAllColumns(data.id, setColumns);
    })();
  }, [currentUser, update]);

  return (
    <div className="sidebar right">
      <div className="user-info">
        <div className="greet">Hello <strong>{currentUser.displayName}</strong></div>
        <div className="avatar">
          <img src={currentUser.photoURL} alt="" />
        </div>
      </div>
      <div className="stats">
        <div className="stat"><span className="label">Total projects</span><strong>{projects.length}</strong></div>
        <div className="stat"><span className="label">Completed</span><strong>174</strong></div>
        <div className="stat"><span className="label">In Progress</span><strong>13</strong></div>
        <div className="stat"><span className="label">Out of Schedule</span><strong>2</strong></div>
      </div>
      <div className="activity-feed">
        <div className="header">
          Activity <span>Feed</span>
        </div>
        <div className="feed-list">
          <ul>
            <li><small>No activities</small></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;