import React, { useContext } from 'react';
import { AuthContext } from 'context/Auth';
import './Rightpanel.scss';

const RightPanel = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="sidebar right">
      <div className="user-info">
        <div className="greet">Hello <strong>{currentUser.displayName}</strong></div>
        <div className="avatar">
          <img src={currentUser.photoURL} alt="" />
        </div>
      </div>
      <div className="stats">
        <div className="stat"><span className="label">Total projects</span><strong>189</strong></div>
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