/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AuthContext } from 'context/Auth';
import { ModalPageContext } from 'context/ModalPage';
import { firebaseApp } from 'firebase/init';

import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import Icon from 'components/misc/IonIcon';
import './Header.scss';

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  return props.link ? (
    <li className="nav-item">
      <NavLink to={props.link} className="icon-button">
        {props.icon}
      </NavLink>
    </li>
  ) : (
      <li className="nav-item">
        <a className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>
        {open && props.children}
      </li>
    );
}

const DropdownMenu = () => {
  const { currentUser } = useContext(AuthContext);

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

  async function handleLogout() {
    await firebaseApp.auth().signOut();
  }

  const DropdownItem = (props) => {
    return props.link ? (
      <NavLink to={props.link} className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </NavLink>
    ) : (
        <a className="menu-item" onClick={() => props.goToMenu ? setActiveMenu(props.goToMenu) : props.clicked()}>
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
          <DropdownItem leftIcon={<Icon name="person-outline" />}>{currentUser.displayName}</DropdownItem>
          <DropdownItem
            leftIcon={<Icon name="settings-outline" />}
            rightIcon={<Icon name="chevron-forward" />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem leftIcon={<Icon name="log-out-outline" />} clicked={handleLogout}>Log Out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<Icon name="chevron-back" />}>
            <h2>Settings</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<Icon name="shield-checkmark-outline" />} link='/'>Change Password</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  );
}

const Header = ({ location }) => {

  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    if (location.pathname.startsWith('/s/board/')) {
      setCurrentPage(location.state.boardName)
    } else {
      setCurrentPage('')
    }
  }, [location])

  const [modalPage, setModalPage] = useContext(ModalPageContext);

  return (
    <header className="app-header">
      <NavLink to="/" className="brand">
        <Logo />
        {/* Task Force */}
      </NavLink>
      <div className="nav-tabs">
        <NavLink to='/s/dashboard' className="tab-btn"> Boards </NavLink>
        <span className="tab-btn current"> {currentPage}</span>
      </div>
      <div className="cta">
        <button disabled={modalPage === 'addboard'} onClick={(e) => setModalPage('addboard')} className="cta-btn"> Create New Board </button>
      </div>
      <Navbar>
        {/* <NavItem link="/s/dashboard" icon={<Icon name="home" />} /> */}
        <NavItem icon={<Icon name="ellipsis-vertical" />}>
          <DropdownMenu />
        </NavItem>
      </Navbar>
    </header>
  );
};


export default withRouter(Header);