import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { firebaseApp } from '../../firebase/init';

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDropdown, setIsDropdown] = useState(false);

  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }

  async function handleLogout() {
    await firebaseApp.auth().signOut();
    setIsDropdown(false);
  }

  return (
    <header>
      <nav>
        <div>
          <NavLink to="/">Task Force</NavLink>
        </div>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
                </NavLink>
          </li>
          <li>
            <NavLink to="/createboard" activeClassName='active'>
              Create a board
                </NavLink>
          </li>
          <li onClick={toggleDropdown}>
            {currentUser.displayName}
          </li>
        </ul>
        {isDropdown && (
          <div>
            <div onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
