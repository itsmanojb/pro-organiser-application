/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { useIsMountedRef } from 'App';

import { AuthContext } from 'context/Auth';
import { ModalPageContext } from 'context/ModalPage';
import { getProjects } from 'utils/data';
import Icon from 'components/misc/IonIcon';
import './Projects.scss';

const ProjectSelector = ({ update, selected }) => {

  const isMountedRef = useIsMountedRef();
  const { currentUser } = useContext(AuthContext);
  const [modalPage, setModalPage] = useContext(ModalPageContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async function () {
      const projects = await getProjects(currentUser.email);
      if (isMountedRef.current) {
        setProjects(projects);
      }
      // await getAllColumns(data.id, setColumns);
      // console.log(projects);
    })();
    return () => isMountedRef.current = false;
  }, [currentUser, update, isMountedRef]);

  return (
    <div className="project-wrapper">
      {projects.length ? (
        <div className="recent-projects">
          <div className="info">Recents projects</div>
          <div className="project-list">
            {projects.map((project, i) => (
              <div className="project" key={i} onClick={(e) => selected(project)}>
                <h4>{project.name}</h4>
                <p className="boards">{project.boards.length} Boards</p>
              </div>
            ))}
          </div>
          <div className="info">Or, <span>create new project</span></div>
          <div className="project-list">
            <div className="project new" onClick={(e) => setModalPage({ name: 'addproject' })}>
              <Icon name="add" />
            </div>
          </div>
        </div>
      ) : (
          <div className="create-new">
            You have no projects created. To get started <span className="clickable" onClick={(e) => setModalPage({ name: 'addproject' })}>create new project</span>.
          </div>
        )}
    </div>
  );
}

export default ProjectSelector;