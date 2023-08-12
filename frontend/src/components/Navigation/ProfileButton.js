// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from "../../context/Modal";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    setShowMenu(false);
    dispatch(sessionActions.logout());
    history.push('/')
   };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div >
      <button
      className="round-gray-button menuButton"
      onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="menuBox">
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            <li>
              <Link to='/spots/current'>Manage Spots</Link>
            </li>
            <li>
              <Link to='/reviews/current'>Manage Reviews</Link>
            </li>
            <li>
              <Link to='/bookings/current'>Manage Bookings</Link>
            </li>
            <li className="logout-button-container">
              <button
              className="round-gray-button"
              onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className="menuBox">
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
