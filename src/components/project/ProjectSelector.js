import React, { useEffect, useContext, useState } from 'react';

import { AuthContext } from 'context/Auth';
import { ProjectContext } from 'context/Project';
import { getProjects } from 'utils/data';
import Icon from 'components/misc/IonIcon';
import './Projects.scss';
import { ModalPageContext } from 'context/ModalPage';

const ProjectSelector = ({ update }) => {

  const { currentUser } = useContext(AuthContext);
  const [modalPage, setModalPage] = useContext(ModalPageContext);
  const [currentproject, setCurrentproject] = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async function () {
      const projects = await getProjects(currentUser.email);
      setProjects(projects);
      // await getAllColumns(data.id, setColumns);
      console.log(projects);
    })();
  }, [currentUser, update]);

  return (
    <div className="project-wrapper">
      {projects.length ? (
        <div className="recent-projects">
          <div className="info">Select from recent projects</div>
          <div className="project-list">
            {projects.map((project, i) => (
              <div className="project" key={i}>
                <h4>{project.name}</h4>
                <p className="boards">{project.boards.length} Boards</p>
              </div>
            ))}
          </div>
          <div className="info">Or, <span>create new project</span></div>
          <div className="project-list">
            <div className="project new" onClick={(e) => setModalPage('addproject')}>
              <Icon name="add" />
            </div>
          </div>
        </div>
      ) : (
          <div className="create-new">
            You have no projects created. To get started <span className="clickable" onClick={(e) => setModalPage('addproject')}>create new project</span>.
          </div>
        )}
    </div>
  );
}

export default ProjectSelector;