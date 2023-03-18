import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotForm from '.';

function CreateSpotForm() {

  return (
    <div>
    <h1>Create a New Spot</h1>
    <SpotForm
    context='create'
    spot={null}
    />
  </div>
  )
}

export default CreateSpotForm;
