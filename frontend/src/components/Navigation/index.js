// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul style={{listStyleType: 'none', display: 'flex'}}>
<li>
  <NavLink style={{fontSize: '50px', color: '#FF5A5F', textDecoration: 'none'}} exact to="/">
  <i className="fa-brands fa-airbnb"></i>
  <span style={{fontSize: '25px'}}>RareBnB</span>
    </NavLink>
</li>
<li>
  { sessionUser && (
  <NavLink style={{fontSize: '20px', color: '#FF5A5F'}} exact to="/spots/new">
  Create a New Spot
  </NavLink>
  )}
</li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
