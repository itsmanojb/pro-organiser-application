/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { firebaseApp } from 'firebase/init';
import confirmService from 'components/confirm/ConfirmService';
import Icon from 'components/misc/IonIcon';
import './Sidenav.scss';

const SideNav = ({ target, extended, setExtended, navigate }) => {

  async function handleLogout() {
    const result = await confirmService.show('Are you sure you want to log out?', 'Confirm!');
    if (result) {
      await firebaseApp.auth().signOut();
    }
  }

  async function archiveProject() {
    const result = await confirmService.show('Are you sure you archive this project?', 'Confirm!');
    if (result) {
      await firebaseApp.auth().signOut();
    }
  }

  function markAsFavorite() {

  }

  return (
    <div className="sidenav">
      <ul className="sidenav-nav">
        {target === 'main' && <>
          <li className="nav-item disabled">
            <a className="nav-link" title="Calendar">
              <Icon name="calendar-outline" />
            </a>
          </li>
          <li className="nav-item disabled">
            <a className="nav-link" title="Statistics">
              <Icon name="analytics-outline" />
            </a>
          </li>
        </>}
        {target === 'project' && <>
          <li className="nav-item">
            <a className="nav-link" title="All Projects" onClick={(e) => navigate('dash')}>
              <Icon name="layers-outline" />
            </a>
          </li>
          <li className="nav-item">
            <a className={extended ? "nav-link active" : "nav-link"} title="Members" onClick={(e) => setExtended(!extended)}>
              <Icon name="people-outline" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Mask as Favorite" onClick={markAsFavorite}>
              <Icon name="star-outline" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Archive Project" onClick={archiveProject}>
              <Icon name="archive-outline" />
            </a>
          </li>
        </>}
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