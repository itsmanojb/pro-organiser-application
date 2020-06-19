import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/Auth';
import { getBoards } from '../../utils/data';

import { Alert } from '../../common/alert/Alert';
import { Loader } from '../../common/loader/Loader';

import './Dashboard.scss';
import SideNav from './Sidenav';

export const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard - TaskForce'
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards(currentUser.email)
      .then((boards) => {
        setBoards(boards);
        setLoading(false);
      })
      .catch(() => {
        setBoards([]);
      });
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <main className="content">
            <div className="dashboard">
              <div>
                <SideNav />
              </div>
              <div className="all-boards">
                <div className="board-header">

                </div>
                <div className="boards-listing">
                  {boards.length === 0 && (
                    <Alert type="info" isClosable={false}>
                      You haven't created any boards. Kindly click on the 'Create a
                      Board' button in the navigation bar to create a board.
                    </Alert>
                  )}
                  <div className="boards">
                    {boards.map((board) => {
                      return (
                        <Link
                          to={'/board/' + board.id}
                          key={board.id}
                          className="board"
                        >
                          <div>{board.name}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="sidebar right"></div>
            </div>
          </main>
        )}
    </>
  );
};
