import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotForm from '.';
import './index.css';

function CreateSpotForm() {

  return (
  <div class='totalContainer'>
    <div class='secondContainer'>
      <h1>Create a New Spot</h1>
      <SpotForm
      context='create'
      spot={null}
      />
    </div>
  </div>
  )
}

export default CreateSpotForm;
