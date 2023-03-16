import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotForm from '.';

function EditSpotForm() {
  let {id} = useParams;
  
  return (
  <div>
    <h1>Update your Spot</h1>
    <SpotForm
    context='update'
    />
  </div>

  )
}

export default EditSpotForm;
