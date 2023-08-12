import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots';
import {useHistory} from 'react-router-dom';
import { useModal } from "../../context/Modal";
import '../LoginFormModal/modal.css'

const BookingModal = ({spotId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const spot = useSelector(state => state.spots.oneSpot);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(spotActions.oneSpot(spotId))
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([]);
    // return dispatch(bookingActions.createBooking(spotId, startDate, endDate, user.d))
    //  .then(closeModal)
    //  .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
  }

  return (
    <div
    className="wholeContainer">
      <h2>Book {spot.name}</h2>
      <form onSubmit={handleSubmit}>
      <button
      type="submit">
        Create Booking for {spot.name}
      </button>
      </form>
    </div>
  )
}

export default BookingModal
