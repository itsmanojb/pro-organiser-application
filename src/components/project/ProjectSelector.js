import React, { useEffect, useContext, useState } from 'react';

import { AuthContext } from 'context/Auth';
import { ProjectContext } from 'context/Project';
import { getProjects } from 'utils/data';
import Icon from 'components/misc/IonIcon';
import './Projects.scss';

const ProjectSelector = () => {

  const { currentUser } = useContext(AuthContext);
  const [currentproject, setCurrentproject] = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async function () {
      const projects = await getProjects(currentUser.email);
      setProjects(projects);
      // await getAllColumns(data.id, setColumns);
      console.log(projects);
    })();
  }, [currentUser]);

  return (
    <div className="project-wrapper">
      {!projects.length ? (
        <div className="recent-projects">
          <div className="info">Select from recent projects</div>
          <div className="project-list">
            <div className="project"></div>
            <div className="project"></div>
            <div className="project"></div>
            <div className="project"></div>
          </div>
          <div className="info">Or <span className="clickable">create new project</span></div>
          <div className="project-list">
            <div className="project new">
              <Icon name="add" />
            </div>
          </div>
        </div>
      ) : (
          <div className="create-new">
            You have no projects created. To get started <span className="clickable">create new project</span>.
          </div>
        )}
    </div>
  );
}

export default ProjectSelector;