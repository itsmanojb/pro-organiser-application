import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/Auth';
import { getBoards } from '../../utils/data';

import { Alert } from '../../common/alert/Alert';
import { Loader } from '../../common/loader/Loader';
import Header from '../../components/header/Header';

import './Home.scss';

export const Home = () => {

  useEffect(() => {
    document.title = 'TaskForce - Dashboard'
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
          <>
            <Header />
            <main className="content">
              <h2>Boards</h2>
              {boards.length === 0 && (
                <Alert type="info" isClosable={false}>
                  You haven't created any boards. Kindly click on the 'Create a
                  Board' button in the navigation bar to create a board.
                </Alert>
              )}
              <div>
                {boards.map((board) => {
                  return (
                    <Link
                      to={'/board/' + board.id}
                      key={board.id}
                    >
                      <div>{board.name}</div>
                    </Link>
                  );
                })}
              </div>
            </main>
          </>
        )}
    </>
  );
};
