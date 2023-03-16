import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotForm from '.';

function CreateSpotForm() {

  return (
    <div>
    <h1>Create an New Spot</h1>
    <SpotForm
    context='create'
    />
  </div>
  )
}

export default CreateSpotForm;
