import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots';
import {useHistory} from 'react-router-dom';
import { useModal } from "../../context/Modal";
import '../LoginFormModal/modal.css'

const DeleteBookingModal = ({spotId}) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
    <div>

    </div>
  )
}

export default DeleteBookingModal
