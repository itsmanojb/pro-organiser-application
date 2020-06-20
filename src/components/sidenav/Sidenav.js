/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Icon from 'components/misc/IonIcon';
import './Sidenav.scss';

const SideNav = () => {
  return (
    <div className="sidenav">
      <ul className="sidenav-nav">
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="layers-outline" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="analytics-outline" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="calendar-outline" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="basketball-outline" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="folder-outline" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="power" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;