import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots';
import {useHistory} from 'react-router-dom';
import { useModal } from "../../context/Modal";
import '../LoginFormModal/modal.css'

const BookingModal = ({spotId}) => {

  let today = new Date()
  let tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState(today.toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(tomorrow.toJSON().slice(0, 10));
  const [minEndDate, setMinEndDate] = useState(tomorrow);
  const spot = useSelector(state => state.spots.oneSpot);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(spotActions.oneSpot(spotId))
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([]);
    return dispatch(bookingActions.createBooking({startDate, endDate}, spotId))
     .then(closeModal)
     .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors([data.message]);
    });
  }

  let setEndDateFunc = (e) => {
    setStartDate(e)
    let date1 = new Date(e)
    let date2 = new Date(e)
    date2.setDate(date1.getDate() + 1)
    setMinEndDate(date2)
  }

  return (
    <div
    className="wholeContainer">
      <h2> Create Reservation For {spot.name}</h2>
      <ul
      style={{
        color: 'firebrick',
        textAlign: 'center',
        padding: '0'
      }}
      >
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
      <input
       min={today.toJSON().slice(0, 10)}
       value={startDate}
       onChange={(e) => setEndDateFunc(e.target.value)}
       type='date'></input>
      <input
       min={minEndDate.toJSON().slice(0, 10)}
       value={endDate}
       onChange={(e) => setEndDate(e.target.value)}
       type='date'></input>
      <button
      disabled={!startDate || !endDate}
      type="submit">
        Submit Reservation
      </button>
      </form>
    </div>
  )
}

export default BookingModal
