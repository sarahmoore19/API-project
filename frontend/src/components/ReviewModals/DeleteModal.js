import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews.js';
import * as spotActions from '../../store/spots.js'

const DeleteModal = ({deleteContext, id}) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch()

  function handleSubmit() {
    deleteContext === 'review' ?
    dispatch(reviewActions.deleteReview(id)) :
    dispatch(spotActions.deleteSpot(id))
  }

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>
        Are you sure you want to delete this
        {
          deleteContext === 'review' ?
          ' review?' :
          ' spot?'
        }
        </p>
        <form onSubmit={handleSubmit}>
        <button
         type='submit'
        >
          Yes (Delete
          {
            deleteContext === 'review' ?
            ' Review)' :
            ' Spot)'
          }
        </button>
        <button
        onClick={() => closeModal()}
        >
          No (Keep
          {
            deleteContext === 'review' ?
            ' Review)' :
            ' Spot)'
          }
        </button>
      </form>
    </div>
  )
}

export default DeleteModal
