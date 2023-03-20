// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import SpotCard from './SpotCard';
import './index.css'

function AllSpots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  let arr = Object.values(spots);

  useEffect(() => {
    dispatch(spotActions.allSpots())
  }, [dispatch])


  return (
    <div className='spotCardsContainer'>
    {arr.map(o => (
      <SpotCard
      reviewContext='home'
      key={o.id}
      spot={o}/>
    ))}
    </div>
  )
}

export default AllSpots;
