import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots';
import {useHistory} from 'react-router-dom';
import { useModal } from "../../context/Modal";
import '../LoginFormModal/modal.css'

const DeleteBookingModal = ({bookingId}) => {

  const dispatch = useDispatch()
  const {closeModal} = useModal();

  function handleDelete(e) {
      dispatch(bookingActions.deleteBooking(bookingId))
      closeModal()
  }

  return (
    <div className="wholeContainer">
      <h2>Confirm Delete</h2>
      <p>
        Are you sure you want to cancel this reservation?
        </p>
        <button
        onClick={handleDelete}>
        Yes</button>
        <button
        id="keepButton"
        onClick={closeModal}>
        No</button>
    </div>
  )
}

export default DeleteBookingModal
