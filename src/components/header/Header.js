/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Icon from '../../components/misc/IonIcon';
import { AuthContext } from '../../context/Auth';
import { firebaseApp } from '../../firebase/init';

import './Header.scss';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 32)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 32);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<Icon name="person-outline" />}>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<Icon name="settings-outline" />}
            rightIcon={<Icon name="chevron-forward" />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem leftIcon={<Icon name="log-out-outline" />}>Log Out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<Icon name="arrow-back" />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<Icon name="logo-apple" />}>Apple</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  );
}

const Header = () => {
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

      <NavLink to="/" className="brand">
        <Logo />
        Task Force
      </NavLink>

      <Navbar>
        <NavItem icon={<Icon name="home" />} />
        <NavItem icon={<Icon name="caret-down" />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
    </header>
    // <header>
    //   <nav>
    //     <div>
    //       <NavLink to="/">Task Force</NavLink>
    //     </div>
    //     <ul>
    //       <li>
    //         <NavLink exact to="/">
    //           Home
    //             </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/createboard" activeClassName='active'>
    //           Create a board
    //             </NavLink>
    //       </li>
    //       <li onClick={toggleDropdown}>
    //         {currentUser.displayName}
    //       </li>
    //     </ul>
    //     {isDropdown && (
    //       <div>
    //         <div onClick={handleLogout}>
    //           Logout
    //         </div>
    //       </div>
    //     )}
    //   </nav>
    // </header>
  );
};


export default Header;