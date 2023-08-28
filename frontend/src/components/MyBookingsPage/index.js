
import { useSelector, useDispatch } from 'react-redux';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots'
import React, { useEffect, useState } from 'react'
import SpotCard from '../AllSpots/SpotCard';
import OpenModalButton from '../OpenModalButton';
import DeleteBookingModal from '../DeleteBookingModal';

function UserBookings() {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings.userBookings);
  let arr = Object.values(bookings);
  const spots = useSelector(state => state.spots.allSpots);
  arr.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  useEffect(() => {
    dispatch(spotActions.allSpots())
    dispatch(bookingActions.userBookings())
  }, [dispatch])


  return (
    <div>
    <h2>Your RareBnB Reservations</h2>
      <div className='spotCardsContainer'>
      {arr.map(o => (
        <div style={{
            position: 'relative',
            maxWidth: '300px'
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
          key={o.Spot.id}
          spot={spots[o.Spot.id]}/>
          <div>Reservation Information</div>
          <div>Address: {o.Spot.address}, {o.Spot.city}, {o.Spot.state}</div>
          <div>Check In: {new Date(o.startDate).toDateString()}</div>
          <div>Check Out: {new Date(o.endDate).toDateString()}</div>
          <div>Total: ${((new Date(o.endDate).valueOf() - new Date(o.startDate).valueOf()) / 86400000) * o.Spot.price}</div>
          {  new Date(o.startDate).valueOf() > new Date().valueOf() &&
          <OpenModalButton
          buttonText={'Cancel Your Reservation'}
          modalComponent={<DeleteBookingModal bookingId={o.id}/>}
          />}
        </div>
      ))}
      </div>
    </div>
  )
}

export default UserBookings;
