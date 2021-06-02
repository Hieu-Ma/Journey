import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/"><h1 id="navbar__title">Journey</h1></NavLink>
      </nav>
      <div id="navbar__border"></div>
    </div>
  );
}

export default NavBar;

{/* <ul>
  <li>
    <NavLink to="/" exact={true} activeClassName="active">
      Home
    </NavLink>
  </li>
  <li>
    <NavLink to="/login" exact={true} activeClassName="active">
      Login
    </NavLink>
  </li>
  <li>
    <NavLink to="/sign-up" exact={true} activeClassName="active">
      Sign Up
    </NavLink>
  </li>
  <li>
    <NavLink to="/users" exact={true} activeClassName="active">
      Users
    </NavLink>
  </li>
  <li>
    <LogoutButton />
  </li>
</ul> */}