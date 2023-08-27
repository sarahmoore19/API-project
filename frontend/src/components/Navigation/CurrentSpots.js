import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots'
import React, { useEffect, useState } from 'react'
import SpotCard from '../AllSpots/SpotCard';
import { oneOf } from 'express-validator';
import '../AllSpots/index.css'

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
    <>
    <div className='headingContainer'>
    <h2>Manage Spots</h2>
    <Link to='/spots/new'>
      <button>
        Create a New Spot
      </button>
    </Link>
    </div>
    <div className='spotCardsContainer currentSpotsContainer'>
    {
      arr.map(o => (
        <div>
        <SpotCard
        reviewContext='user'
        key={o.id}
        spot={o}
        />
        <div
        >
          <Link to={`/bookings/${o.id}`}>
            <button>
              View Bookings
            </button>
          </Link>
        </div>
        </div>
      ))
    }
    </div>
    </>
  )
}


export default CurrentSpots;
