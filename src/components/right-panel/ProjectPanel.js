import React from 'react';
// import { AuthContext } from 'context/Auth';
import './Rightpanel.scss';

const ProjectPanel = ({ project }) => {

  return (
    <div className="sidebar project right">
      <div className="user-info">
        <div className="greet">
          <strong>{project.name}</strong>
        </div>
        <div className="desc">{project.description}</div>
      </div>
      <div className="stats">
        <div className="stat"><span className="label">Members</span><strong>{project.members.length}</strong></div>
        <div className="stat"><span className="label">Boards</span><strong>{project.boards.length}</strong></div>
      </div>
      <div className="activity-feed">
        <div className="header">
          Project Activity <span>Feed</span>
        </div>
        {/* <div className="feed-list">
          <ul>
            <li><small>No recent activities</small></li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default ProjectPanel;