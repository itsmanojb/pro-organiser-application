import React from 'react';
import './Rightpanel.scss';

const RightPanel = () => {
  return (
    <div className="sidebar right">
      <div className="user-info">
        <div className="greet">hello <strong>User name</strong></div>
        <div className="avatar">
          <img src="//via.placeholder.com/200" alt="" />
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
        <div className="feed-list"></div>
      </div>
    </div>
  );
}

export default RightPanel;