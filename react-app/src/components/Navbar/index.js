import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <div>
      <nav>
        <NavLink to="/"><h1 id="navbar__title">Journey</h1></NavLink>
      </nav>
      <div id="navbar__border"></div>
      <div id="username">{user.username}</div>
      <LogoutButton />
    </div>
  );
}

export default NavBar;