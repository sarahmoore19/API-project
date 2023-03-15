import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots'
import React, { useEffect, useState } from 'react'
import SpotCard from '../AllSpots/SpotCard';
import { oneOf } from 'express-validator';

function CurrentSpots() {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.allSpots);
  const sessionUser = useSelector(state => state.session.user);

  let arr = Object.values(spots);
  arr = arr.filter(o => o.ownerId == sessionUser.id);
  
  useEffect(() => {
    dispatch(spotActions.allSpots())
  }, [dispatch])

  return (
    <div>
    <h2>Manage Spots</h2>
    {
      arr.map(o => (
        <SpotCard
        reviewContext='user'
        key={o.id}
        spot={o}
      />
      ))
    }
    </div>
  )
}


export default CurrentSpots;
