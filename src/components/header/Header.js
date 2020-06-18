/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { AuthContext } from '../../context/Auth';
import { firebaseApp } from '../../firebase/init';
import Icon from '../../components/misc/IonIcon';

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

const Header = () => {

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return null;

  return (
    <header>
      <NavLink to="/dashbaord" className="brand">
        <Logo /> Task Force
      </NavLink>
      <Navbar>
        <NavItem link="/dashbaord" icon={<Icon name="home" />} />
        <NavItem link="/new-board" icon={<Icon name="clipboard-outline" />} />
        <NavItem icon={<Icon name="caret-down" />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
    </header>
  );
};


export default Header;