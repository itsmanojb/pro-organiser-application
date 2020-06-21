/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AuthContext } from 'context/Auth';
import { ProjectContext } from 'context/Project';
import { ModalPageContext } from 'context/ModalPage';
import { firebaseApp } from 'firebase/init';
import { getProjects } from 'utils/data';

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


const NavItem = ({ children, link, icon, label, klass = 'icon-button' }) => {
  const [open, setOpen] = useState(false);

  return link ? (
    <li className="nav-item">
      <NavLink to={link} className={klass}>
        {icon} {label}
      </NavLink>
    </li>
  ) : (
      <li className="nav-item">
        <a className={klass} onClick={() => setOpen(!open)}>
          {icon} {label}
        </a>
        {open && children}
      </li>
    );
}


const DropdownMenu = ({ items, current }) => {

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
          {props.leftIcon && <span className="icon-button">{props.leftIcon}</span>}
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
          <div className="overscroll">
            {items.filter(item => current.name !== item.name).map((item, i) => (
              <DropdownItem key={i} leftIcon={<Icon name="folder-outline" />}>{item.name}</DropdownItem>
            ))}
            {/* <DropdownItem leftIcon={<Icon name="person-outline" />}>{currentUser.displayName}</DropdownItem>
            <DropdownItem
              leftIcon={<Icon name="settings-outline" />}
              rightIcon={<Icon name="chevron-forward" />}
              goToMenu="settings"
            >
              Settings
          </DropdownItem> */}
          </div>
          <span className="divider"></span>
          <DropdownItem leftIcon={<Icon name="chevron-back" />}>Projects Home</DropdownItem>
          {/* <span className="divider"></span>
          <DropdownItem leftIcon={<Icon name="log-out-outline" />} clicked={handleLogout}>Log Out</DropdownItem> */}
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


const Header = ({ update }) => {

  const [currentPage, setCurrentPage] = useState('Select Project');
  const [currentProject, setCurrentProject] = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [modalPage, setModalPage] = useContext(ModalPageContext);
  const [projects, setProjects] = useState([]);

  // console.log(currentProject);

  useEffect(() => {
    (async function () {
      const projects = await getProjects(currentUser.email);
      setProjects(projects);
      // await getAllColumns(data.id, setColumns);
    })();
  }, [currentUser, update]);

  useEffect(() => {
    if (currentProject) {
      const projectName = currentProject.name;
      setCurrentPage(projectName);
    }
  }, [currentProject]);


  // useEffect(() => {
  //   if (location.pathname.startsWith('/s/board/')) {
  //     setCurrentPage(location.state.boardName)
  //   } else {
  //     setCurrentPage('')
  //   }
  // }, [location]);


  return (
    <header className="app-header">
      <NavLink to="/" className="brand">
        <Logo />
        {/* Task Force */}
      </NavLink>
      <div className="nav-actions">
        {/* <NavLink to='/s/dashboard' className="tab-btn"> Boards </NavLink> */}
        {/* <span className="tab-btn current"> {currentPage}</span> */}
        <Navbar>
          {/* <NavItem link="/s/dashboard" icon={<Icon name="home" />} /> */}
          <NavItem label={currentPage} klass='text-button'>
            <DropdownMenu items={projects} current={currentProject} />
          </NavItem>
        </Navbar>
      </div>
      <div className="cta">
        <button disabled={!currentProject} onClick={(e) => setModalPage('addboard')} className="cta-btn"> Create New Board </button>
      </div>
      <div className="search">
        <Navbar>
          <NavItem link="/s/dashboard" icon={<Icon name="search" />} />
        </Navbar>
      </div>
    </header>
  );
};

export default withRouter(Header);