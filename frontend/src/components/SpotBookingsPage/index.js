
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Link } from 'react-router-dom';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots'
import React, { useEffect, useState } from 'react'
import SpotCard from '../AllSpots/SpotCard';

function SpotBookings() {
  let {id} = useParams()
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings.spotBookings);
  let arr = Object.values(bookings);
  const spots = useSelector(state => state.spots.allSpots);
  // const spot = spots[id]
  arr.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  useEffect(() => {
    dispatch(spotActions.allSpots())
    dispatch(bookingActions.spotBookings(id))
  }, [dispatch])

  return (
    <div>
    <h2>Manage Your Spot Reservations</h2>
      {arr.length == 0 && <div>You do not have any reservations for this spot!</div>}
      <div className='spotCardsContainer'>
      {arr.map(o => (
        <div
        style={{
          maxWidth: '300px',
          position: 'relative'
        }}>
          { new Date(o.endDate).valueOf() < new Date().valueOf() &&
           <div
            style={{
              backgroundColor: 'black',
              border: '1px solid white',
              padding: '10px',
              color: 'red',
              position: 'absolute',
              top: '113px',
              left: '80px',
              borderRadius: '8px'
            }}>COMPLETED</div> }
        <SpotCard
        reviewContext='home'
        key={o.spotId}
        spot={spots[o.spotId]}/>
        <div>Reservation Information</div>
        <div>Customer Name: {o.User.firstName} {o.User.lastName}</div>
        <div>Check In: {new Date(o.startDate).toDateString()}</div>
        <div>Check Out: {new Date(o.endDate).toDateString()}</div>
        <button>Cancel Customer Reservation</button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default SpotBookings;
