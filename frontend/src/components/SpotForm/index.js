import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SpotForm() {
  const sessionUser = useSelector(state => state.session.user);
  
  return (
    <div>
      <h1>Create a New Spot</h1>

    </div>
  )
}

export default SpotForm;
