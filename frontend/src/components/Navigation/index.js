// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul
    className='navBar'
    >
      <li>
        <NavLink
        className='logoContainer'
        exact to="/">
        <i className="fa-brands fa-airbnb"></i>
        <span style={{ marginLeft: '10px', fontSize: '25px'}}>RareBnB</span>
          </NavLink>
      </li>
      <li className='navRightContainer'>
        {sessionUser && (
          <NavLink exact to="/spots/new">
          Create a New Spot
          </NavLink>
        )}
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </li>
    </ul>
  );
}

export default Navigation;
