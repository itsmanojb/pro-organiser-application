import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { ModalPageContext } from 'context/ModalPage';
import { Dashboard } from 'views/secure/dashboard/Dashboard';
import { Board } from 'views/secure/board/Board';

import { AddBoard } from 'views/secure/create-board/AddBoard';
import Header from 'components/header/Header';

const SecurePage = () => {

  let { path } = useRouteMatch();
  const [modalPage, setModalPage] = useContext(ModalPageContext);
  const [updateTime, setUpdateTime] = useState(null);

  useEffect(() => {
    setModalPage(modalPage);
  });

  const updatePage = (timestamp) => {
    setModalPage('');
    setUpdateTime(timestamp);
  }

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/dashboard`} />
        </Route>
        <Route
          path={`${path}/dashboard`}
          render={(props) => (
            <Dashboard {...props} update={updateTime} />
          )}
        />
        <Route path={`${path}/board/:name/:id`} component={Board} />
      </Switch>
      {modalPage === 'addboard' &&
        <AddBoard
          added={(e) => updatePage(e)}
          closed={() => setModalPage('')}
        />}
    </>
  );
}

export default SecurePage;