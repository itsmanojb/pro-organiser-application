import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { ProjectContext } from 'context/Project';

import SideNav from 'components/sidenav/Sidenav';
import RightPanel from 'components/right-panel/RightPanel';
import ProjectSelector from 'components/project/ProjectSelector';
import './Dashboard.scss';

export const Dashboard = ({ update }) => {

  useEffect(() => {
    document.title = 'Dashboard - TaskForce'
  }, []);

  const [currentProject] = useContext(ProjectContext);

  return (
    <>
      <main className="content">
        <div className="dashboard">
          <div><SideNav /></div>
          <div className="all-boards">
            {
              !currentProject
                ? <ProjectSelector update={update} />
                : <Redirect to={`/s/project/${currentProject.id}`} />
            }
          </div>
          <div><RightPanel update={update} /></div>
        </div>
      </main>
    </>
  );
};
