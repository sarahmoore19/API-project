import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews.js';
import * as spotActions from '../../store/spots.js'
import { useHistory } from "react-router-dom";
import '../LoginFormModal/modal.css'

const DeleteModal = ({deleteContext, review, spot}) => {
  const dispatch = useDispatch()
  const {closeModal} = useModal();

  function handleDelete(e) {
      deleteContext === 'review' ?
      dispatch(reviewActions.deleteReview(review)) :
      dispatch(spotActions.deleteSpot(spot.id))
      closeModal()
  }

  return (
    <div className="wholeContainer">
      <h2>Confirm Delete</h2>
      <p>
        Are you sure you want to delete this
        {
          deleteContext === 'review' ?
          ' review?' :
          ' spot?'
        }
        </p>
        <button
        onClick={handleDelete}
        >
          Yes (Delete
          {
            deleteContext === 'review' ?
            ' Review)' :
            ' Spot)'
          }
        </button>
        <button
        id="keepButton"
        onClick={closeModal}
        >
          No (Keep
          {
            deleteContext === 'review' ?
            ' Review)' :
            ' Spot)'
          }
        </button>
    </div>
  )
}

export default DeleteModal
