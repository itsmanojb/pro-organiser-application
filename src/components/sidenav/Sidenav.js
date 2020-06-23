/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { firebaseApp } from 'firebase/init';
import confirmService from 'components/confirm/ConfirmService';
import Icon from 'components/misc/IonIcon';
import './Sidenav.scss';

const SideNav = ({ extended, setExtended }) => {

  async function handleLogout() {
    const result = await confirmService.show('Are you sure you want to log out?', 'Confirm!');
    if (result) {
      await firebaseApp.auth().signOut();
    }
  }

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
            <Icon name="folder-outline" />
          </a>
        </li>
        <li className="nav-item" title="Members" onClick={(e) => setExtended(!extended)}>
          <a className={extended ? "nav-link active" : "nav-link"}>
            <Icon name="people-outline" />
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link">
            <Icon name="analytics-outline" />
          </a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link">
            <Icon name="calendar-outline" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout} title="Log Out">
            <Icon name="power" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;