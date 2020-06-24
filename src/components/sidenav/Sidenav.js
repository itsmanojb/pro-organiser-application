/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { firebaseApp } from 'firebase/init';
import { getProject, updateProject, archiveProject } from 'utils/data';
import confirmService from 'components/confirm/ConfirmService';
import { ProjectContext } from 'context/Project';
import { ToastsContext } from 'context/Toasts';
import Icon from 'components/misc/IonIcon';
import './Sidenav.scss';

const SideNav = ({ target, extended, setExtended, navigate }) => {

  const history = useHistory();
  const [currentProject, setCurrentProject] = useContext(ProjectContext);
  const [toasts, setToasts] = useContext(ToastsContext);

  async function handleLogout() {
    const result = await confirmService.show('Are you sure you want to log out?', 'Confirm!');
    if (result) {
      await firebaseApp.auth().signOut();
    }
  }

  async function doArchive() {

    const result = await confirmService.show('Are you sure you archive this project?', 'Confirm!');
    if (result) {
      const archived = await archiveProject(currentProject.id);
      setToasts([
        ...toasts,
        {
          message: archived ? 'Project has been archived' : 'Failed to archive the project',
          id: toasts.length,
          title: archived ? 'Success' : 'Error',
          backgroundColor: archived ? '#47bf50' : '#d9534f',
          icon: archived ? 'checkmark-circle' : 'warning'
        }
      ]);
      localStorage.removeItem('currentProject');
      setCurrentProject(null);
      history.push(`/s`);
    }
  }

  async function markAsFavorite() {
    const updated = await updateProject(currentProject.id, { pinned: !currentProject.pinned });
    if (updated) {
      const updatedDoc = await getProject(currentProject.id);
      updatedDoc['id'] = currentProject.id;
      setCurrentProject(updatedDoc);
    }
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
        {currentProject && <>
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
              <Icon name={currentProject.pinned ? "star" : "star-outline"} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Edit Project">
              <Icon name="create-outline" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Archive Project" onClick={doArchive}>
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