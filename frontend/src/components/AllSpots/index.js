// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import SpotCard from './SpotCard';


function AllSpots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  console.log('==========', spots);
  let arr = Object.values(spots);
  console.log('---------', arr);

  useEffect(() => {
    dispatch(spotActions.allSpots())
    console.log('use effect triggered')
  }, [dispatch])


  if (!arr.length) return null

  return (
    <div>
    <h2>Spots</h2>
    <div>
    {arr.map(o => (
      <SpotCard
      key={o.id}
      spot={o}/>
    ))}
    </div>
    </div>
  )
}

export default AllSpots;
