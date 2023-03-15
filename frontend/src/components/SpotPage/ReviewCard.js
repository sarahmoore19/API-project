import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../ReviewModals/DeleteModal';

function ReviewCard({review, reviewContext}) {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div>
      <p>{reviewContext == 'spot' ? review.User.firstName : review.Spot.name}</p>
      <p>{new Date(review.createdAt).toDateString()}</p>
      <p>{review.review}</p>
      {
        sessionUser &&
        review.userId == sessionUser.id &&
        reviewContext == 'user' &&
        <button>Update</button>
      }
      {
        sessionUser &&
        review.userId == sessionUser.id &&
        <OpenModalButton
          buttonText='Delete'
          modalComponent={
          <DeleteModal
          id={review.id}
          deleteContext='review' />}
        />
      }
    </div>
  )
}

export default ReviewCard;
