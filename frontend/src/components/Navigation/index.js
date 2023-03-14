import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <ul style={{listStyleType: 'none', display: 'flex'}}>
      <li>
        <NavLink style={{fontSize: '50px', color: '#FF5A5F', textDecoration: 'none'}} exact to="/">
        <i class="fa-brands fa-airbnb"></i>
        <span style={{fontSize: '25px'}}>RareBnB</span>
          </NavLink>
      </li>
      <li>
        { sessionUser && (
        <NavLink style={{fontSize: '20px', color: '#FF5A5F'}} exact to="/spot/CREATE">
        Create a Spot
        </NavLink>
        )}
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
